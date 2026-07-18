from django.core.management.base import BaseCommand
from deepdive.models import DeepDiveLevel, DeepDiveSubSection


LEVEL_1_MODULES = [
    {
        'title': 'آشنایی با پایتون',
        'subtitle': 'Introduction to Python',
        'subsections': [
            {'title': 'پایتون چیست؟', 'number': 1, 'desc': 'What is Python? — تاریخچه، مزایا و کاربردها'},
            {'title': 'نصب و راه‌اندازی', 'number': 2, 'desc': 'Installation & Setup — نصب Python و اجرای اولین برنامه'},
            {'title': 'متغیرها و انواع داده', 'number': 3, 'desc': 'Variables & Data Types — اعداد، رشته‌ها و boolean'},
            {'title': 'ورودی و خروجی', 'number': 4, 'desc': 'Input & Output — کار با print و input'},
            {'title': 'آزمون میان‌فصل ۱', 'number': 5, 'desc': 'Mid-Level Exam 1', 'is_exam': True},
            {'title': 'عملگرها', 'number': 6, 'desc': 'Operators — عملگرهای حسابی، مقایسه‌ای و منطقی'},
            {'title': 'شرط‌ها', 'number': 7, 'desc': 'Conditionals — if/elif/else'},
            {'title': 'حلقه‌ها', 'number': 8, 'desc': 'Loops — for و while'},
            {'title': 'لیست‌ها', 'number': 9, 'desc': 'Lists — ساختمان داده پایه'},
            {'title': 'آزمون پایان سطح ۱', 'number': 10, 'desc': 'Level 1 Final Exam', 'is_exam': True},
        ]
    },
]


def build_mcqs(topic, count=30):
    mcqs = []
    for i in range(1, count + 1):
        mcqs.append({
            'question': f'سوال {i} درباره {topic} — کدام گزینه صحیح است؟',
            'options': [
                {'text': f'گزینه صحیح برای {topic} — توضیح کامل', 'correct': True},
                {'text': f'گزینه نادرست ۱', 'correct': False},
                {'text': f'گزینه نادرست ۲', 'correct': False},
            ],
            'explanation': f'توضیح: گزینه اول صحیح است زیرا به طور کامل مفهوم {topic} را توضیح می‌دهد.'
        })
    return mcqs


def build_fill_blanks(topic, count=5):
    blanks = []
    for i in range(1, count + 1):
        blanks.append({
            'sentence': f'در پایتون، برای تعریف {topic} از علامت ____ استفاده می‌کنیم.',
            'answer': f'={topic}'
        })
    return blanks


def build_writing_exercises(topic, count=3):
    exercises = []
    for i in range(1, count + 1):
        exercises.append({
            'prompt': f'یک برنامه پایتون بنویسید که مفهوم {topic} را نشان دهد.',
            'rubric': '- استفاده صحیح از سینتکس\n- خروجی مناسب\n- خوانایی کد'
        })
    return exercises


class Command(BaseCommand):
    help = 'Seeds the Deep-Dive learning structure for Level 1 (Persian/Farsi)'

    def handle(self, *args, **options):
        for level_data in LEVEL_1_MODULES:
            level, created = DeepDiveLevel.objects.get_or_create(
                number=1,
                defaults={
                    'title': level_data['title'],
                    'subtitle': level_data['subtitle'],
                    'description': 'یادگیری عمیق پایتون — از پایه تا پیشرفته. این سطح شامل ۱۰ زیربخش با تمرینات جامع است.',
                    'icon': '🐍',
                    'order': 1,
                    'is_published': True,
                }
            )
            if created:
                self.stdout.write(f'Created level: {level.title}')
            else:
                self.stdout.write(f'Level already exists: {level.title}')

            for sub_data in level_data['subsections']:
                sec, created = DeepDiveSubSection.objects.get_or_create(
                    level=level,
                    number=sub_data['number'],
                    defaults={
                        'title': sub_data['title'],
                        'description': sub_data.get('desc', ''),
                        'is_exam': sub_data.get('is_exam', False),
                        'theory': self._build_theory(sub_data['title']),
                        'mcqs': build_mcqs(sub_data['title']),
                        'fill_blanks': build_fill_blanks(sub_data['title']),
                        'writing_exercises': build_writing_exercises(sub_data['title']),
                    }
                )
                if created:
                    self.stdout.write(f'  Created subsection {sub_data["number"]}: {sec.title}')
                else:
                    self.stdout.write(f'  Subsection already exists: {sec.title}')

        self.stdout.write(self.style.SUCCESS('Deep-Dive Level 1 seeded successfully!'))

    def _build_theory(self, title):
        return f'''
<h2>{title}</h2>
<p>در این بخش، مفهوم <strong>{title}</strong> را به صورت عمیق بررسی می‌کنیم.</p>

<h3>مقدمه</h3>
<p>{title} یکی از مفاهیم اساسی در برنامه‌نویسی پایتون است. در اینجا چندین روش مختلف برای کار با آن یاد می‌گیرید.</p>

<h3>روش اول — رویکرد پایه</h3>
<pre><code># مثال ساده
x = 10
print(x)</code></pre>

<h3>روش دوم — رویکرد پیشرفته</h3>
<pre><code># مثال پیشرفته
def process(data):
    return [item for item in data if item > 0]

result = process([-1, 2, -3, 4])
print(result)  # [2, 4]</code></pre>

<h3>روش سوم — کاربرد عملی</h3>
<pre><code># کاربرد واقعی
class DataProcessor:
    def __init__(self, data):
        self.data = data

    def transform(self):
        return [self._transform(x) for x in self.data]

    def _transform(self, x):
        return x ** 2</code></pre>

<h3>نکات کلیدی</h3>
<ul>
<li>نکته مهم اول: همیشه به نوع داده توجه کنید</li>
<li>نکته مهم دوم: از توابع مناسب استفاده کنید</li>
<li>نکته مهم سوم: کد خود را تست کنید</li>
</ul>

<h3>جمع‌بندی</h3>
<p>در این درس، {title} را از زوایای مختلف بررسی کردیم. تمرینات زیر را انجام دهید تا مطالب را تثبیت کنید.</p>
'''
