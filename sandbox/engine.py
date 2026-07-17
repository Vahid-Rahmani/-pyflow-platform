import sys
import subprocess
import tempfile
import os
import time
import textwrap

TIMEOUT_SECONDS = 5
MAX_OUTPUT_LENGTH = 10000
MAX_MEMORY_MB = 100

BLOCKED_IMPORTS = [
    'os', 'subprocess', 'sys', 'shutil', 'socket',
    'ctypes', 'multiprocessing', 'threading', 'importlib',
    'pickle', 'shelve', 'marshal', 'pty', 'tty',
    'signal', 'tkinter', 'webbrowser', 'antigravity',
]

RESTRICTED_BUILTINS = """
import builtins as _b
_builtins = _b.__dict__.copy()
for _key in list(dir(_b)):
    if _key.startswith('_') and _key not in ('__import__',):
        continue
for _module in {blocked}:
    _b.__dict__.pop(_module, None)
""".format(blocked=BLOCKED_IMPORTS)

WRAPPER_TEMPLATE = textwrap.dedent("""\
{restricted}
import sys as _sys
_sys.tracebacklimit = 0
# === USER CODE START ===
{user_code}
# === USER CODE END ===
""")


def execute_code(user_code: str) -> dict:
    sanitized_code = WRAPPER_TEMPLATE.format(
        restricted=RESTRICTED_BUILTINS,
        user_code=user_code,
    )

    with tempfile.TemporaryDirectory() as tmpdir:
        script_path = os.path.join(tmpdir, 'script.py')
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(sanitized_code)

        try:
            start = time.time()
            result = subprocess.run(
                [sys.executable, '-I', '-B', script_path],
                capture_output=True,
                text=True,
                timeout=TIMEOUT_SECONDS,
                cwd=tmpdir,
                env={'PYTHONIOENCODING': 'utf-8', 'PYTHONDONTWRITEBYTECODE': '1'},
            )
            elapsed = time.time() - start

            output = result.stdout[:MAX_OUTPUT_LENGTH]
            error = result.stderr[:2000]

            return {
                'success': result.returncode == 0,
                'output': output,
                'error': error if result.returncode != 0 else '',
                'execution_time': round(elapsed, 3),
            }

        except subprocess.TimeoutExpired:
            return {
                'success': False,
                'output': '',
                'error': f'Execution timed out after {TIMEOUT_SECONDS} seconds',
                'execution_time': TIMEOUT_SECONDS,
            }
        except Exception as e:
            return {
                'success': False,
                'output': '',
                'error': f'Execution error: {str(e)}',
                'execution_time': 0,
            }
