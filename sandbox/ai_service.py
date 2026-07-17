import re


CONCEPT_EXPLANATIONS = {
    'variable': (
        "**Variables** are containers for storing data.\n\n"
        "Think of them like labeled boxes where you put values:\n"
        "```python\nname = 'Alice'   # A box labeled 'name' containing 'Alice'\nage = 25        # A box labeled 'age' containing 25\n```\n\n"
        "Once defined, you can use the variable anywhere in your code. "
        "Python figures out the type automatically (this is called 'dynamic typing')."
    ),
    'string': (
        "**Strings** are sequences of text characters.\n\n"
        "You can create them with single quotes `'...'` or double quotes `\"...\"`:\n"
        "```python\ngreeting = 'Hello'\nname = \"World\"\nmessage = f\"{greeting}, {name}!\"  # f-strings let you embed variables\n```\n\n"
        "Operations you can do with strings:\n"
        "- `+` concatenation: `'Hello ' + 'World'`\n"
        "- `*` repetition: `'Ha' * 3` → `'HaHaHa'`\n"
        "- `len()` get length: `len('Python')` → `6`\n"
        "- `.upper()` / `.lower()` change case"
    ),
    'list': (
        "**Lists** store multiple items in a single variable.\n\n"
        "```python\nfruits = ['apple', 'banana', 'cherry']\nnumbers = [1, 2, 3, 4, 5]\n```\n\n"
        "Key features:\n"
        "- Items are **ordered** and **changeable**\n"
        "- Index starts at **0**: `fruits[0]` → `'apple'`\n"
        "- You can add: `.append()`, `.insert()`\n"
        "- You can remove: `.remove()`, `.pop()`\n"
        "- Negative index counts from end: `fruits[-1]` → last item"
    ),
    'dictionary': (
        "**Dictionaries** store key-value pairs.\n\n"
        "```python\nperson = {\n    'name': 'Alice',\n    'age': 25,\n    'city': 'Berlin'\n}\n```\n\n"
        "Instead of numeric indexes, you access values by **keys**:\n"
        "- `person['name']` → `'Alice'`\n"
        "- `person.get('age')` → `25` (safer, returns None if missing)\n\n"
        "You can modify, add, or remove keys freely. "
        "Dictionaries are perfect for representing real-world objects."
    ),
    'function': (
        "**Functions** are reusable blocks of code.\n\n"
        "```python\ndef greet(name):\n    \"\"\"Say hello to someone\"\"\"\n    return f'Hello, {name}!'\n\n# Call the function\nmessage = greet('Alice')\nprint(message)  # Hello, Alice!\n```\n\n"
        "Why use functions?\n"
        "- **Don't repeat yourself** - write once, use many times\n"
        "- **Organize code** - break complex problems into smaller pieces\n"
        "- **Parameters** let you customize behavior\n"
        "- **return** sends a value back to the caller"
    ),
    'loop': (
        "**Loops** let you repeat code multiple times.\n\n"
        "**For loop** - iterate over a sequence:\n"
        "```python\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\nfruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(fruit)\n```\n\n"
        "**While loop** - repeat while a condition is True:\n"
        "```python\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n```\n\n"
        "⚠️ Always ensure while loops have a way to exit (avoid infinite loops!)"
    ),
    'class': (
        "**Classes** are blueprints for creating objects.\n\n"
        "```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name  # Attribute\n    \n    def bark(self):      # Method\n        return f'{self.name} says Woof!'\n\n# Create an instance\nmy_dog = Dog('Buddy')\nprint(my_dog.bark())  # Buddy says Woof!\n```\n\n"
        "OOP concepts:\n"
        "- **Encapsulation** - bundle data and methods together\n"
        "- **Inheritance** - create child classes from parent classes\n"
        "- **Polymorphism** - same method name, different behavior"
    ),
    'if': (
        "**Conditional statements** let your code make decisions.\n\n"
        "```python\nage = 18\n\nif age >= 18:\n    print('Adult')\nelif age >= 13:\n    print('Teenager')\nelse:\n    print('Child')\n```\n\n"
        "Comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`\n"
        "Logical operators: `and`, `or`, `not`\n\n"
        "Remember the **colon** `:` at the end of each condition line, "
        "and **indent** the code block that follows!"
    ),
    'api': (
        "**APIs** (Application Programming Interfaces) let programs talk to each other.\n\n"
        "Using the `requests` library:\n"
        "```python\nimport requests\n\n# GET request\nresponse = requests.get('https://api.github.com/users/python')\ndata = response.json()\nprint(data['login'])\n\n# POST request\nnew = {'title': 'Learn Python', 'completed': False}\nresponse = requests.post('https://jsonplaceholder.typicode.com/todos', json=new)\n```\n\n"
        "Common HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove).\n"
        "Always handle potential network errors with try/except!"
    ),
    'error': (
        "**Errors** are Python's way of saying something went wrong.\n\n"
        "Use try/except to handle them gracefully:\n"
        "```python\ntry:\n    number = int(input('Enter a number: '))\n    result = 10 / number\n    print(f'Result: {result}')\nexcept ValueError:\n    print('Please enter a valid number!')\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nexcept Exception as e:\n    print(f'Unexpected error: {e}')\nfinally:\n    print('This always runs.')\n```\n\n"
        "Common exceptions: `ValueError`, `TypeError`, `FileNotFoundError`, `IndexError`, `KeyError`"
    ),
}

ERROR_EXPLANATIONS = {
    'NameError': (
        "**NameError: name 'X' is not defined**\n\n"
        "Python doesn't recognize this name. Common causes:\n"
        "1. **Typo**: You misspelled the variable or function name\n"
        "2. **Not defined yet**: You used a variable before creating it\n"
        "3. **Scope**: The variable exists in a different function or block\n\n"
        "✅ Check the spelling and make sure you've defined the name before using it."
    ),
    'SyntaxError': (
        "**SyntaxError: invalid syntax**\n\n"
        "Python can't understand your code because of a typo. Common causes:\n"
        "1. **Missing colon** `:` after if/for/while/def\n"
        "2. **Unmatched parentheses** `()` or quotes `\"\"`\n"
        "3. **Wrong indentation** - Python is picky about spacing!\n"
        "4. **Missing comma** between items in a list or arguments\n\n"
        "✅ Look at the line Python mentions - the error is usually right before or at that position."
    ),
    'TypeError': (
        "**TypeError**\n\n"
        "You're trying to do an operation on incompatible types.\n"
        "Example: `'5' + 3` - adding a string to a number\n\n"
        "✅ Convert types to match:\n"
        "```python\nint('5') + 3   # 8 (convert string to int)\n'5' + str(3)  # '53' (convert int to string)\n```"
    ),
    'IndexError': (
        "**IndexError: list index out of range**\n\n"
        "You're trying to access an element that doesn't exist.\n"
        "```python\nfruits = ['apple', 'banana']\nfruits[2]  # Error! Only indices 0 and 1 exist\n```\n\n"
        "✅ Remember: list indices start at 0, and the last index is `len(list) - 1`.\n"
        "Use `len()` to check the size before accessing."
    ),
    'KeyError': (
        "**KeyError**\n\n"
        "You're trying to access a dictionary key that doesn't exist.\n"
        "```python\nperson = {'name': 'Alice'}\nperson['age']  # Error! 'age' key doesn't exist\n```\n\n"
        "✅ Use `.get()` instead: `person.get('age')` returns `None` without error.\n"
        "Or check first: `if 'age' in person:`"
    ),
    'IndentationError': (
        "**IndentationError**\n\n"
        "Python requires consistent indentation for code blocks.\n\n"
        "✅ Use **4 spaces** for each indentation level. Don't mix tabs and spaces!\n"
        "Most code editors can auto-indent - use that feature."
    ),
    'AttributeError': (
        "**AttributeError**\n\n"
        "You're trying to access a method or property that doesn't exist on this object.\n"
        "```python\n'hello'.append('world')  # Error! Strings don't have .append()\n```\n\n"
        "✅ Check the type of your object with `type()` and make sure the method exists."
    ),
    'ZeroDivisionError': (
        "**ZeroDivisionError: division by zero**\n\n"
        "You can't divide a number by zero in Python (it's mathematically undefined).\n\n"
        "✅ Check your denominator before dividing:\n"
        "```python\nif denominator != 0:\n    result = numerator / denominator\nelse:\n    print('Cannot divide by zero')\n```"
    ),
    'ModuleNotFoundError': (
        "**ModuleNotFoundError**\n\n"
        "Python can't find the module you're trying to import.\n\n"
        "✅ Did you install it? Use `pip install module_name`\n"
        "✅ Did you spell it correctly? Module names are case-sensitive.\n"
        "✅ Is it a standard library module? Some need to be installed separately."
    ),
    'FileNotFoundError': (
        "**FileNotFoundError**\n\n"
        "Python can't find the file you're trying to open.\n\n"
        "✅ Check that:\n"
        "1. The filename is spelled correctly\n"
        "2. The file exists in the current directory\n"
        "3. You're using the correct file path (use `os.getcwd()` to check)"
    ),
}


def get_tutor_response(user_message: str, user_level: str = 'beginner', conversation_history: list = None) -> dict:
    msg = user_message.lower().strip()

    if 'explain' in msg or 'what is' in msg or 'what are' in msg or 'define' in msg or 'tell me about' in msg:
        for concept, explanation in CONCEPT_EXPLANATIONS.items():
            if concept in msg:
                return {'type': 'explanation', 'content': explanation}

        if any(w in msg for w in ['error', 'exception', 'try', 'except']):
            return {'type': 'explanation', 'content': CONCEPT_EXPLANATIONS['error']}

        return {
            'type': 'explanation',
            'content': (
                "I'd be happy to explain Python concepts!\n\n"
                "You can ask me about:\n"
                "- **Variables** - storing data\n"
                "- **Strings** - working with text\n"
                "- **Lists** - ordered collections\n"
                "- **Dictionaries** - key-value pairs\n"
                "- **Functions** - reusable code\n"
                "- **Loops** - for and while\n"
                "- **Classes** - object-oriented programming\n"
                "- **If/else** - making decisions\n"
                "- **Error handling** - try/except\n"
                "- **APIs** - connecting to web services\n\n"
                "Just say: 'Explain [topic]' or 'What is [topic]?'"
            ),
        }

    error_match = re.search(r'(NameError|SyntaxError|TypeError|IndexError|KeyError|IndentationError|AttributeError|ZeroDivisionError|ModuleNotFoundError|FileNotFoundError)', msg)
    if error_match:
        err_type = error_match.group(1)
        explanation = ERROR_EXPLANATIONS.get(err_type, "**Error Explanation**\n\nRead the error message carefully - Python tells you exactly what went wrong and often which line to check!")
        return {'type': 'error_help', 'content': explanation}

    if 'debug' in msg or 'fix' in msg or 'help' in msg or 'not working' in msg or 'wrong' in msg:
        code_blocks = re.findall(r'```python\n(.*?)```', user_message, re.DOTALL)
        code = code_blocks[0] if code_blocks else ''

        if code:
            issues = []
            if 'print' not in code and len(code) > 50:
                issues.append("Add `print()` statements to see what your code is doing")
            if '=+' in code:
                issues.append("`=+` should be `+=` for incrementing")
            if code.count('(') != code.count(')'):
                issues.append("Unmatched parentheses - check that every `(` has a matching `)`")
            if code.count('"') % 2 != 0 or code.count("'") % 2 != 0:
                issues.append("Unmatched quotes - check your string literals")
            if ': ' in code and 'def ' in code and 'return' not in code:
                issues.append("Your function doesn't have a `return` statement")

            if issues:
                response = "**Debugging Help**\n\nI found these potential issues:\n\n"
                for i, issue in enumerate(issues, 1):
                    response += f"{i}. {issue}\n"
                if user_level == 'beginner':
                    response += "\n💡 **Tip:** Try adding `print()` at each step to see what's happening. This is called 'debug print' and every programmer uses it!"
                return {'type': 'debug', 'content': response}

            return {
                'type': 'debug',
                'content': (
                    "**Debugging Tips**\n\n"
                    "1. **Read the error message** - It tells you the line number and what went wrong\n"
                    "2. **Check variable values** - Add `print(variable_name)` to see what's stored\n"
                    "3. **Divide and conquer** - Comment out half the code to isolate the problem\n"
                    "4. **Rubber duck debugging** - Explain your code line by line to someone (or a rubber duck!)\n\n"
                    "Want me to check something specific? Share your code in a code block with ```python"
                ),
            }

        return {
            'type': 'debug',
            'content': (
                "**Need help debugging?**\n\n"
                "Paste your code in a code block like this:\n"
                "```python\n# Your code here\n```\n\n"
                "Also tell me:\n"
                "- What **should** happen?\n"
                "- What **actually** happens?\n"
                "- Any error messages you see?"
            ),
        }

    if 'example' in msg or 'show me' in msg or 'how do i' in msg or 'how to' in msg:
        if 'loop' in msg or 'for' in msg:
            return {'type': 'example', 'content': "**For Loop Examples**\n\n```python\n# Loop through a list\ncolors = ['red', 'green', 'blue']\nfor color in colors:\n    print(color)\n\n# Loop with range\nfor i in range(5):\n    print(f'Number {i}')\n\n# Loop with index\nfor i, color in enumerate(colors):\n    print(f'{i}: {color}')\n```"}
        if 'function' in msg or 'def' in msg:
            return {'type': 'example', 'content': "**Function Examples**\n\n```python\n# Simple function\ndef say_hello():\n    print('Hello!')\n\n# Function with parameters\ndef greet(name):\n    return f'Hello, {name}!'\n\n# Function with default parameter\ndef power(base, exp=2):\n    return base ** exp\n\nprint(greet('Alice'))   # Hello, Alice!\nprint(power(3))         # 9\nprint(power(3, 3))      # 27\n```"}
        if 'list' in msg:
            return {'type': 'example', 'content': "**List Examples**\n\n```python\n# Create\nfruits = ['apple', 'banana', 'cherry']\nnumbers = list(range(5))  # [0, 1, 2, 3, 4]\n\n# Access\nprint(fruits[0])       # First item\nprint(fruits[-1])      # Last item\nprint(fruits[1:3])     # Slice\n\n# Modify\nfruits.append('date')  # Add to end\nfruits.insert(1, 'blueberry')\nfruits.remove('apple')\n\n# Loop\nfor fruit in fruits:\n    print(fruit.upper())\n```"}
        return {'type': 'example', 'content': "**What kind of example do you need?**\n\nI can show you examples of:\n- `for` loops\n- `while` loops\n- `if/else` conditions\n- Functions\n- Lists\n- Dictionaries\n- Classes\n- File handling\n\nJust say: 'Show me [topic] example'"}

    if 'improve' in msg or 'better' in msg or 'refactor' in msg or 'optimize' in msg:
        return {
            'type': 'improvement',
            'content': (
                "**Code Improvement Tips**\n\n"
                "1. **Use descriptive names** - `user_age` is better than `x`\n"
                "2. **Keep functions small** - Each function should do one thing\n"
                "3. **Avoid repeating code** - If you write the same thing twice, make it a function\n"
                "4. **Use list comprehensions** - Instead of:\n"
                "   ```python\n   squares = []\n   for i in range(10):\n       squares.append(i**2)\n   ```\n"
                "   Use: `squares = [i**2 for i in range(10)]`\n"
                "5. **Add docstrings** - Explain what your functions do\n"
                "6. **Handle errors** - Use try/except for things that might fail\n\n"
                "Share your code and I'll give specific suggestions!"
            ),
        }

    if 'hello' in msg or 'hi' in msg or 'hey' in msg:
        level_emojis = {'beginner': '🌱', 'basic': '📚', 'intermediate': '💪', 'advanced': '🚀'}
        emoji = level_emojis.get(user_level, '👋')
        return {
            'type': 'greeting',
            'content': (
                f"Hello! {emoji} I'm your Python tutor.\n\n"
                "I can help you with:\n"
                "✅ **Explain concepts** - 'What is a variable?'\n"
                "✅ **Debug code** - 'Help, my code isn't working'\n"
                "✅ **Fix errors** - 'I got a NameError'\n"
                "✅ **Show examples** - 'Show me a function example'\n"
                "✅ **Improve code** - 'How can I make this better?'\n\n"
                "What would you like to learn today?"
            ),
        }

    if 'who are you' in msg or 'what can you do' in msg:
        return {
            'type': 'about',
            'content': (
                "I'm **PythonAI Tutor**, your personal programming mentor! 🤖\n\n"
                "I'm built into this learning platform to help you master Python.\n\n"
                "**My capabilities:**\n"
                "- Explain programming concepts in simple terms\n"
                "- Help debug your code when you're stuck\n"
                "- Explain cryptic error messages\n"
                "- Show you practical code examples\n"
                "- Suggest improvements to your code\n"
                "- Adapt explanations to your level\n\n"
                "**How to use me:**\n"
                "Just type your question naturally! I'll understand what you need."
            ),
        }

    return {
        'type': 'general',
        'content': (
            "That's a great question! Let me help you understand this better.\n\n"
            "Here are some things you can ask me:\n\n"
            "📚 **Learn concepts:** 'Explain functions', 'What is a list?'\n"
            "🐛 **Debug code:** 'My code isn't working', 'I get a TypeError'\n"
            "💡 **Get examples:** 'Show me a loop example'\n"
            "🔧 **Improve skills:** 'How can I write better code?'\n\n"
            "Or if you're working on a specific challenge, just paste your code and tell me what's not working!"
        ),
    }


def analyze_code(code: str) -> dict:
    issues = []
    suggestions = []

    if 'import os' in code or 'import subprocess' in code:
        issues.append({'severity': 'warning', 'message': 'Using system modules (os, subprocess) is not allowed in this environment.'})
    if 'eval(' in code or 'exec(' in code:
        issues.append({'severity': 'error', 'message': 'Using eval() or exec() is not allowed for security reasons.'})
    if 'while True' in code or 'while 1' in code:
        issues.append({'severity': 'warning', 'message': 'Infinite loop detected. Make sure you have a break condition.'})

    func_matches = re.findall(r'def (\w+)\((.*?)\):', code)
    for func_name, params in func_matches:
        if params.strip() == '':
            suggestions.append(f"Function '{func_name}' takes no parameters. Consider adding input parameters.")

    if 'print(' not in code and len(code) > 50:
        suggestions.append('Consider adding print() statements to see your output.')
    if len(code) > 300 and not any(c in code for c in ['#', '"""', "'''"]):
        suggestions.append('Your code is getting long. Add comments to explain what each part does.')

    if issues or suggestions:
        summary = 'AI Code Review:\n'
        if issues:
            summary += '\nIssues found:\n'
            for issue in issues:
                summary += f"  [{issue['severity'].upper()}] {issue['message']}\n"
        if suggestions:
            summary += '\nSuggestions:\n'
            for s in suggestions:
                summary += f"  - {s}\n"
        return {'has_feedback': True, 'analysis': summary, 'issues': issues, 'suggestions': suggestions}

    return {'has_feedback': False, 'analysis': 'AI Code Review: Your code looks good! No issues detected.', 'issues': [], 'suggestions': []}


def get_hint(challenge_title: str, code: str) -> str:
    hints = {
        'hello_world': "Use the print() function to output text. Try: print('Hello, World!')",
        'variables': "Create a variable by using the = sign. For example: name = 'Alice'",
        'if_else': "Use if/elif/else for conditional logic. Don't forget the colon at the end!",
        'loops': "Use for item in collection: to loop, or while condition: for indefinite loops.",
        'functions': "Define a function with def function_name(parameters): and don't forget the return statement.",
        'lists': "Create a list with square brackets: my_list = [1, 2, 3]. Access items by index.",
        'dictionaries': "Create a dict with curly braces: my_dict = {'key': 'value'}. Access by key.",
    }
    for key, hint in hints.items():
        if key.replace('_', ' ') in challenge_title.lower():
            return hint
    if 'for' not in code and 'while' not in code:
        return "Hint: Think about what loop structure would work best here."
    if 'def ' not in code:
        return "Hint: Consider breaking your solution into a function."
    if 'return' not in code:
        return "Hint: Does your function return the result?"
    return "Hint: Check your logic step by step. Try adding print() to debug."


def explain_error(error_message: str) -> str:
    for err_type, explanation in ERROR_EXPLANATIONS.items():
        if err_type in error_message:
            return f"💡 {explanation}\n\nError: {error_message}"
    return f"💡 An error occurred. Read the error message carefully - it often tells you the line number and what went wrong.\n\nError: {error_message}"
