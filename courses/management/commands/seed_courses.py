from django.core.management.base import BaseCommand
from courses.models import Course, Module, Lesson, CodeChallenge, Quiz, Question, Answer


CONTENT = [
    # ===== LEVEL 1: PYTHON FUNDAMENTALS =====
    {
        'course': {
            'title': 'Python Fundamentals',
            'slug': 'python-fundamentals',
            'description': 'Master the foundations of Python programming. From your first "Hello, World!" to writing clean, efficient code with functions and data structures. This course is designed for absolute beginners with zero prior experience.',
            'short_description': 'Learn Python from scratch: variables, data types, control flow, functions, and data structures.',
            'icon': '🐍',
            'difficulty': 'beginner',
                    'order': 1,
                    'is_published': True,
                },
                'modules': [
            {
                'title': 'Welcome to Python',
                'slug': 'welcome-to-python',
                'description': 'Set up your environment and write your first Python program.',
                'order': 1,
                'lessons': [
                    {
                        'title': 'What is Python?',
                        'slug': 'what-is-python',
                        'content': '<h2>Welcome to Python!</h2><p>Python is one of the world\'s most popular programming languages. It\'s known for being:</p><ul><li><strong>Easy to read</strong> - Python code looks clean and simple</li><li><strong>Versatile</strong> - Used for web development, AI, data science, automation, and more</li><li><strong>Beginner-friendly</strong> - Perfect for your first programming language</li></ul><p>In this course, you\'ll go from complete beginner to writing real Python programs.</p><h2>How This Platform Works</h2><p>Each lesson teaches you a concept, then you practice with coding challenges and quizzes. You earn XP (experience points) as you progress, leveling up your skills!</p>',
                        'lesson_type': 'text',
                        'xp_reward': 5,
                        'order': 1,
                    },
                    {
                        'title': 'Your First Program',
                        'slug': 'first-program',
                        'content': '<h2>Hello, World!</h2><p>The tradition in programming is to start with a program that prints "Hello, World!"</p><p>In Python, printing is done with the <code>print()</code> function:</p><pre><code>print("Hello, World!")</code></pre><p>When you run this code, Python will display: <code>Hello, World!</code></p><p>The <code>print()</code> function outputs text to the screen. Text inside quotes <code>" "</code> is called a <strong>string</strong>.</p>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 2,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Print Your Name',
                        'slug': 'print-your-name',
                        'instruction': '<h2>Print Your Name</h2><p>Write a program that prints your name to the screen.</p><p>Example output: <code>My name is Alex</code></p>',
                        'starter_code': '# Write your code here\nprint()',
                        'solution_code': "print('My name is Alex')",
                        'difficulty': 'beginner',
                        'xp_reward': 15,
                        'order': 1,
                    },
                    {
                        'title': 'Print Multiple Lines',
                        'slug': 'print-multiple-lines',
                        'instruction': '<h2>Print Multiple Lines</h2><p>Use three <code>print()</code> statements to print three lines:</p><ol><li>Your name</li><li>Your age</li><li>Your favorite color</li></ol>',
                        'starter_code': '# Print your info on three lines\n',
                        'solution_code': "print('Alex')\nprint('25')\nprint('Blue')",
                        'difficulty': 'beginner',
                        'xp_reward': 15,
                        'order': 2,
                    },
                ],
                'quizzes': [
                    {
                        'title': 'Python Basics Check',
                        'slug': 'python-basics-check',
                        'xp_reward': 10,
                        'order': 1,
                        'questions': [
                            {
                                'question_text': 'What function do you use to output text in Python?',
                                'question_type': 'multiple_choice',
                                'order': 1,
                                'answers': [
                                    {'answer_text': 'print()', 'is_correct': True},
                                    {'answer_text': 'output()', 'is_correct': False},
                                    {'answer_text': 'echo()', 'is_correct': False},
                                    {'answer_text': 'write()', 'is_correct': False},
                                ],
                            },
                            {
                                'question_text': 'Text inside quotes is called a:',
                                'question_type': 'multiple_choice',
                                'order': 2,
                                'answers': [
                                    {'answer_text': 'Integer', 'is_correct': False},
                                    {'answer_text': 'String', 'is_correct': True},
                                    {'answer_text': 'Variable', 'is_correct': False},
                                    {'answer_text': 'Function', 'is_correct': False},
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                'title': 'Variables & Data Types',
                'slug': 'variables-data-types',
                'description': 'Learn how to store and work with data using variables.',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Variables',
                        'slug': 'variables',
                        'content': '<h2>What are Variables?</h2><p>Variables are like labeled boxes where you store data. You create a variable by giving it a name and assigning a value:</p><pre><code>name = "Alice"\nage = 25\nheight = 1.75</code></pre><p>Rules for variable names:</p><ul><li>Can contain letters, numbers, and underscores</li><li>Must start with a letter or underscore</li><li>Cannot start with a number</li><li>Are case-sensitive (<code>name</code> and <code>Name</code> are different)</li></ul>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 1,
                    },
                    {
                        'title': 'Data Types',
                        'slug': 'data-types',
                        'content': '<h2>Python Data Types</h2><p>Python has several built-in data types:</p><ul><li><strong>int</strong> - Whole numbers: <code>42</code>, <code>-7</code>, <code>0</code></li><li><strong>float</strong> - Decimal numbers: <code>3.14</code>, <code>-0.5</code></li><li><strong>str</strong> - Text strings: <code>"Hello"</code>, <code>"42"</code></li><li><strong>bool</strong> - Boolean: <code>True</code>, <code>False</code></li></ul><p>Use <code>type()</code> to check the type of any value:</p><pre><code>print(type(42))      # &lt;class \'int\'&gt;\nprint(type("hi"))    # &lt;class \'str\'&gt;</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 2,
                    },
                    {
                        'title': 'Type Conversion',
                        'slug': 'type-conversion',
                        'content': '<h2>Converting Between Types</h2><p>You can convert between types using built-in functions:</p><ul><li><code>int()</code> - Convert to integer</li><li><code>float()</code> - Convert to float</li><li><code>str()</code> - Convert to string</li></ul><pre><code>age = "25"\nprint(age + 1)       # Error!\nprint(int(age) + 1)  # 26 (works!)</code></pre><p>This is called <strong>type casting</strong> or <strong>type conversion</strong>.</p>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 3,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Create Variables',
                        'slug': 'create-variables',
                        'instruction': '<h2>Create Variables</h2><p>Create three variables:</p><ol><li><code>city</code> with your city name (string)</li><li><code>population</code> with a number (integer)</li><li><code>is_capital</code> with True or False (boolean)</li></ol><p>Print all three variables.</p>',
                        'starter_code': '# Create your variables here\n',
                        'solution_code': "city = 'Berlin'\npopulation = 3600000\nis_capital = True\nprint(city)\nprint(population)\nprint(is_capital)",
                        'difficulty': 'beginner',
                        'xp_reward': 20,
                        'order': 1,
                    },
                    {
                        'title': 'Fix the Type Error',
                        'slug': 'fix-type-error',
                        'instruction': '<h2>Fix the Type Error</h2><p>The following code has an error. Fix it by converting the string to a number:</p><pre><code>points = "100"\nbonus = 50\ntotal = points + bonus  # This causes an error!\nprint(total)</code></pre>',
                        'starter_code': 'points = "100"\nbonus = 50\n# Fix the next line:\ntotal = points + bonus\nprint(total)',
                        'solution_code': 'points = "100"\nbonus = 50\ntotal = int(points) + bonus\nprint(total)',
                        'difficulty': 'beginner',
                        'xp_reward': 20,
                        'order': 2,
                    },
                ],
            },
            {
                'title': 'Strings & Numbers',
                'slug': 'strings-numbers',
                'description': 'Master working with text and numbers in Python.',
                'order': 3,
                'lessons': [
                    {
                        'title': 'String Operations',
                        'slug': 'string-operations',
                        'content': '<h2>Working with Strings</h2><p>Strings have many useful operations:</p><pre><code># Concatenation (joining)\nfirst = "Hello "\nsecond = "World"\nprint(first + second)  # Hello World\n\n# Repetition\nprint("Ha" * 3)         # HaHaHa\n\n# Length\nprint(len("Python"))     # 6\n\n# Upper/Lower case\nprint("hello".upper())   # HELLO\nprint("HELLO".lower())   # hello</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 1,
                    },
                    {
                        'title': 'String Formatting',
                        'slug': 'string-formatting',
                        'content': '<h2>String Formatting</h2><p>There are several ways to include variables in strings:</p><pre><code>name = "Alice"\nage = 25\n\n# f-strings (Python 3.6+, recommended)\nprint(f"My name is {name} and I am {age} years old")\n\n# .format() method\nprint("My name is {} and I am {} years old".format(name, age))\n\n# Old style %\nprint("My name is %s and I am %d years old" % (name, age))</code></pre><p><strong>f-strings</strong> are the most modern and readable way. Use them!</p>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 2,
                    },
                    {
                        'title': 'Numbers & Math',
                        'slug': 'numbers-math',
                        'content': '<h2>Numbers and Math Operations</h2><p>Python supports all standard math operations:</p><pre><code># Basic arithmetic\nprint(10 + 3)    # 13  (addition)\nprint(10 - 3)    # 7   (subtraction)\nprint(10 * 3)    # 30  (multiplication)\nprint(10 / 3)    # 3.33... (division - returns float)\nprint(10 // 3)   # 3   (integer division)\nprint(10 % 3)    # 1   (modulus - remainder)\nprint(10 ** 3)   # 1000 (exponentiation)</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 3,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Personal Greeting',
                        'slug': 'personal-greeting',
                        'instruction': '<h2>Personal Greeting</h2><p>Create a program that:</p><ol><li>Creates variables for name, age, and city</li><li>Prints a sentence using f-strings like: <code>Hello, I am Alex, 25 years old from Berlin.</code></li></ol>',
                        'starter_code': '# Your greeting program\n',
                        'solution_code': "name = 'Alex'\nage = 25\ncity = 'Berlin'\nprint(f'Hello, I am {name}, {age} years old from {city}.')",
                        'difficulty': 'beginner',
                        'xp_reward': 20,
                        'order': 1,
                    },
                    {
                        'title': 'Tip Calculator',
                        'slug': 'tip-calculator',
                        'instruction': '<h2>Tip Calculator</h2><p>Write a program that calculates a 15% tip on a $50 meal.</p><p>Calculate: <code>tip = bill_amount * 0.15</code></p><p>Print: <code>"Tip: $7.50"</code> (round to 2 decimal places)</p>',
                        'starter_code': 'bill = 50\ntip_rate = 0.15\n# Calculate and print the tip\n',
                        'solution_code': 'bill = 50\ntip_rate = 0.15\ntip = bill * tip_rate\nprint(f"Tip: ${tip:.2f}")',
                        'difficulty': 'beginner',
                        'xp_reward': 25,
                        'order': 2,
                    },
                ],
            },
            {
                'title': 'Lists & Dictionaries',
                'slug': 'lists-dictionaries',
                'description': 'Learn Python\'s most powerful data structures.',
                'order': 4,
                'lessons': [
                    {
                        'title': 'Lists',
                        'slug': 'lists',
                        'content': '<h2>Lists</h2><p>Lists store multiple items in one variable:</p><pre><code>fruits = ["apple", "banana", "cherry"]\nnumbers = [1, 2, 3, 4, 5]\nmixed = [1, "hello", 3.14, True]\n\n# Access items by index (starts at 0)\nprint(fruits[0])    # apple\nprint(fruits[-1])   # cherry (last item)\n\n# Slice lists\nprint(fruits[1:3])  # ["banana", "cherry"]\n\n# Modify items\nfruits[1] = "blueberry"\n\n# Add items\nfruits.append("date")   # Add to end\nfruits.insert(0, "avocado")  # Add at position\n\n# Remove items\nfruits.remove("apple")  # Remove by value\npopped = fruits.pop()   # Remove and return last</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 12,
                        'order': 1,
                    },
                    {
                        'title': 'Tuples',
                        'slug': 'tuples',
                        'content': '<h2>Tuples</h2><p>Tuples are like lists but <strong>immutable</strong> (cannot be changed after creation):</p><pre><code>coordinates = (10, 20)\ncolors = ("red", "green", "blue")\n\n# Access items (same as lists)\nprint(coordinates[0])  # 10\n\n# Tuples cannot be modified!\n# coordinates[0] = 30  # This causes an error!\n\n# Use tuples for data that should never change\n# They\'re faster and safer than lists</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 2,
                    },
                    {
                        'title': 'Dictionaries',
                        'slug': 'dictionaries',
                        'content': '<h2>Dictionaries</h2><p>Dictionaries store key-value pairs:</p><pre><code>person = {\n    "name": "Alice",\n    "age": 25,\n    "city": "Berlin"\n}\n\n# Access values by key\nprint(person["name"])   # Alice\nprint(person.get("age"))  # 25 (safer - returns None if missing)\n\n# Modify\nperson["age"] = 26\n\n# Add new key\nperson["job"] = "Developer"\n\n# Check if key exists\nif "name" in person:\n    print("Name exists!")\n\n# Get all keys/values\nprint(person.keys())\nprint(person.values())\nprint(person.items())</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 12,
                        'order': 3,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Shopping List',
                        'slug': 'shopping-list',
                        'instruction': '<h2>Shopping List</h2><p>Create a shopping list with at least 5 items. Then:</p><ol><li>Print the third item</li><li>Add a new item to the end</li><li>Remove the first item</li><li>Print the final list</li></ol>',
                        'starter_code': '# Create and manipulate a shopping list\n',
                        'solution_code': "shopping = ['milk', 'bread', 'eggs', 'cheese', 'apples']\nprint(shopping[2])\nshopping.append('bananas')\nshopping.pop(0)\nprint(shopping)",
                        'difficulty': 'beginner',
                        'xp_reward': 20,
                        'order': 1,
                    },
                    {
                        'title': 'Student Database',
                        'slug': 'student-database',
                        'instruction': '<h2>Student Database</h2><p>Create a dictionary for a student with keys: name, age, grade, subjects (a list).</p><p>Print the student\'s name and their first subject.</p><p>Then add a new subject and print all subjects.</p>',
                        'starter_code': '# Create a student dictionary\n',
                        'solution_code': "student = {\n    'name': 'Emma',\n    'age': 20,\n    'grade': 'A',\n    'subjects': ['Math', 'Physics']\n}\nprint(student['name'])\nprint(student['subjects'][0])\nstudent['subjects'].append('Chemistry')\nprint(student['subjects'])",
                        'difficulty': 'beginner',
                        'xp_reward': 25,
                        'order': 2,
                    },
                ],
            },
            {
                'title': 'Control Flow',
                'slug': 'control-flow',
                'description': 'Make decisions in your code with conditionals and loops.',
                'order': 5,
                'lessons': [
                    {
                        'title': 'If/Else Conditions',
                        'slug': 'if-else',
                        'content': '<h2>Conditional Statements</h2><p>Use <code>if</code>, <code>elif</code>, and <code>else</code> to make decisions:</p><pre><code>age = 18\n\nif age >= 18:\n    print("You can vote!")\nelif age >= 16:\n    print("You can drive!")\nelse:\n    print("You\'re too young")\n\n# Comparison operators\n# ==  equal to\n# !=  not equal to\n# &lt;   less than\n# &gt;   greater than\n# &lt;=  less than or equal\n# &gt;=  greater than or equal\n\n# Logical operators\n# and - both conditions must be True\n# or  - at least one must be True\n# not - reverses the condition</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 12,
                        'order': 1,
                    },
                    {
                        'title': 'For Loops',
                        'slug': 'for-loops',
                        'content': '<h2>For Loops</h2><p>For loops let you iterate over sequences:</p><pre><code># Loop through a list\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# Loop using range()\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# Loop with index\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\n# Loop through dictionary\nperson = {"name": "Alice", "age": 25}\nfor key, value in person.items():\n    print(f"{key}: {value}")</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 12,
                        'order': 2,
                    },
                    {
                        'title': 'While Loops',
                        'slug': 'while-loops',
                        'content': '<h2>While Loops</h2><p>While loops run as long as a condition is True:</p><pre><code>count = 0\nwhile count < 5:\n    print(count)\n    count += 1  # Don\'t forget to increment!\n\n# Break - exit the loop\nwhile True:\n    answer = input("Type \'quit\' to exit: ")\n    if answer == "quit":\n        break\n\n# Continue - skip to next iteration\nfor i in range(10):\n    if i % 2 == 0:\n        continue  # Skip even numbers\n    print(i)</code></pre><p><strong>Warning:</strong> Always make sure your while loop condition will eventually become False to avoid infinite loops!</p>',
                        'lesson_type': 'text',
                        'xp_reward': 12,
                        'order': 3,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Even or Odd',
                        'slug': 'even-or-odd',
                        'instruction': '<h2>Even or Odd</h2><p>Write a program that checks if a number is even or odd.</p><p>Use the modulo operator <code>%</code>: if <code>number % 2 == 0</code>, it\'s even.</p><p>Test with the number 7 and print "7 is odd" or "7 is even".</p>',
                        'starter_code': 'number = 7\n# Check if even or odd\n',
                        'solution_code': "number = 7\nif number % 2 == 0:\n    print(f'{number} is even')\nelse:\n    print(f'{number} is odd')",
                        'difficulty': 'beginner',
                        'xp_reward': 20,
                        'order': 1,
                    },
                    {
                        'title': 'Countdown Timer',
                        'slug': 'countdown-timer',
                        'instruction': '<h2>Countdown Timer</h2><p>Use a while loop to count down from 10 to 1, then print "Liftoff!"</p>',
                        'starter_code': '# Countdown from 10 to 1\ncount = 10\n',
                        'solution_code': 'count = 10\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Liftoff!")',
                        'difficulty': 'beginner',
                        'xp_reward': 25,
                        'order': 2,
                    },
                ],
            },
            {
                'title': 'Functions',
                'slug': 'functions',
                'description': 'Write reusable code with functions.',
                'order': 6,
                'lessons': [
                    {
                        'title': 'Defining Functions',
                        'slug': 'defining-functions',
                        'content': '<h2>Creating Functions</h2><p>Functions let you package code into reusable blocks:</p><pre><code>def greet():\n    print("Hello! Welcome to Python.")\n\n# Call the function\ngreet()  # Hello! Welcome to Python.\n\n# Function with parameters\ndef greet_person(name):\n    print(f"Hello, {name}!")\n\ngreet_person("Alice")  # Hello, Alice!\n\n# Function with return value\ndef add(a, b):\n    result = a + b\n    return result\n\nsum = add(5, 3)\nprint(sum)  # 8</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 12,
                        'order': 1,
                    },
                    {
                        'title': 'Default Parameters & Scope',
                        'slug': 'default-parameters-scope',
                        'content': '<h2>Default Parameters & Variable Scope</h2><pre><code># Default parameters\ndef greet(name="Guest"):\n    print(f"Hello, {name}!")\n\ngreet()           # Hello, Guest!\ngreet("Alice")    # Hello, Alice!\n\n# Multiple return values\ndef get_min_max(numbers):\n    return min(numbers), max(numbers)\n\nlowest, highest = get_min_max([3, 7, 1, 9, 4])\nprint(lowest, highest)  # 1 9\n\n# Variable scope\nx = 10  # Global variable\n\ndef my_func():\n    y = 5  # Local variable\n    print(x)  # Can access global\n    \nmy_func()\n# print(y)  # Error! y is not accessible here</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 12,
                        'order': 2,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Temperature Converter',
                        'slug': 'temperature-converter',
                        'instruction': '<h2>Temperature Converter</h2><p>Write a function <code>celsius_to_fahrenheit(celsius)</code> that converts Celsius to Fahrenheit.</p><p>Formula: <code>fahrenheit = celsius * 9/5 + 32</code></p><p>Test with 0°C (should be 32°F) and 100°C (should be 212°F).</p>',
                        'starter_code': 'def celsius_to_fahrenheit(celsius):\n    # Your code here\n    pass\n\n# Test your function\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))\n',
                        'solution_code': "def celsius_to_fahrenheit(celsius):\n    return celsius * 9/5 + 32\n\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))",
                        'difficulty': 'beginner',
                        'xp_reward': 25,
                        'order': 1,
                    },
                    {
                        'title': 'Password Validator',
                        'slug': 'password-validator',
                        'instruction': '<h2>Password Validator</h2><p>Write a function <code>validate_password(password)</code> that returns True if the password is at least 8 characters long and contains at least one number.</p><p>Tip: Use <code>any(char.isdigit() for char in password)</code> to check for numbers.</p>',
                        'starter_code': 'def validate_password(password):\n    # Your code here\n    pass\n\nprint(validate_password("pass"))       # False (too short)\nprint(validate_password("password123")) # True\n',
                        'solution_code': "def validate_password(password):\n    if len(password) < 8:\n        return False\n    if not any(char.isdigit() for char in password):\n        return False\n    return True\n\nprint(validate_password('pass'))\nprint(validate_password('password123'))",
                        'difficulty': 'beginner',
                        'xp_reward': 30,
                        'order': 2,
                    },
                ],
            },
        ],
    },
    # ===== LEVEL 2: INTERMEDIATE PYTHON =====
    {
        'course': {
            'title': 'Intermediate Python',
            'slug': 'intermediate-python',
            'description': 'Level up your Python skills with object-oriented programming, file handling, error management, and working with APIs. Build production-ready code.',
            'short_description': 'OOP, file handling, error handling, APIs, and virtual environments.',
            'icon': '⚡',
            'difficulty': 'intermediate',
                    'order': 2,
                    'is_published': True,
                },
                'modules': [
            {
                'title': 'Object-Oriented Programming',
                'slug': 'oop',
                'description': 'Learn to structure code using classes and objects.',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Classes & Objects',
                        'slug': 'classes-objects',
                        'content': '<h2>Object-Oriented Programming</h2><p>OOP is a programming paradigm that uses "objects" to structure code.</p><pre><code># Define a class\nclass Dog:\n    # Constructor (initializer)\n    def __init__(self, name, age):\n        self.name = name  # Attributes\n        self.age = age\n    \n    # Method\n    def bark(self):\n        return f"{self.name} says Woof!"\n\n# Create objects (instances)\nmy_dog = Dog("Buddy", 3)\nprint(my_dog.name)    # Buddy\nprint(my_dog.bark())  # Buddy says Woof!</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                    {
                        'title': 'Inheritance & Encapsulation',
                        'slug': 'inheritance-encapsulation',
                        'content': '<h2>Inheritance & Encapsulation</h2><pre><code># Inheritance\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        pass\n\nclass Cat(Animal):  # Cat inherits from Animal\n    def speak(self):\n        return f"{self.name} says Meow!"\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} says Woof!"\n\n# Encapsulation (private attributes)\nclass BankAccount:\n    def __init__(self):\n        self.__balance = 0  # Private (double underscore)\n    \n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    \n    def get_balance(self):\n        return self.__balance</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 2,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Build a Bank Class',
                        'slug': 'build-bank-class',
                        'instruction': '<h2>Build a Bank Class</h2><p>Create a <code>BankAccount</code> class with:</p><ul><li><code>__init__(self, owner, balance=0)</code></li><li><code>deposit(self, amount)</code> - adds money</li><li><code>withdraw(self, amount)</code> - removes money if sufficient</li><li><code>get_info(self)</code> - returns "Owner: $balance"</li></ul>',
                        'starter_code': 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    \n    # Add deposit method\n    # Add withdraw method\n    # Add get_info method\n\n# Test\naccount = BankAccount("Alice", 1000)\nprint(account.get_info())\n',
                        'solution_code': "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n        return f'Deposited ${amount}. New balance: ${self.balance}'\n    \n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            return f'Withdrew ${amount}. New balance: ${self.balance}'\n        return 'Insufficient funds'\n    \n    def get_info(self):\n        return f'{self.owner}: ${self.balance}'\n\naccount = BankAccount('Alice', 1000)\nprint(account.get_info())\naccount.deposit(500)\nprint(account.get_info())",
                        'difficulty': 'intermediate',
                        'xp_reward': 35,
                        'order': 1,
                    },
                ],
            },
            {
                'title': 'File Handling',
                'slug': 'file-handling',
                'description': 'Read and write files with Python.',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Reading & Writing Files',
                        'slug': 'reading-writing-files',
                        'content': '<h2>Working with Files</h2><pre><code># Writing to a file\nwith open("notes.txt", "w") as file:\n    file.write("Hello, World!\\n")\n    file.write("This is a new line.")\n\n# Reading a file\nwith open("notes.txt", "r") as file:\n    content = file.read()\n    print(content)\n\n# Reading line by line\nwith open("notes.txt", "r") as file:\n    for line in file:\n        print(line.strip())\n\n# Append to a file\nwith open("notes.txt", "a") as file:\n    file.write("\\nThis line is appended.")\n\n# File modes\n# "r" - read (default)\n# "w" - write (overwrites)\n# "a" - append\n# "r+" - read and write</code></pre><p>Always use the <code>with</code> statement - it automatically closes the file!</p>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Note Taker',
                        'slug': 'note-taker',
                        'instruction': '<h2>Note Taker</h2><p>Write a program that saves notes to a file.</p><p>Create a function <code>save_note(filename, note)</code> that appends a note with a timestamp to a file.</p><p>Tip: Use <code>from datetime import datetime</code> for timestamps.</p>',
                        'starter_code': 'from datetime import datetime\n\ndef save_note(filename, note):\n    # Your code here\n    pass\n\nsave_note("my_notes.txt", "Buy groceries")\nsave_note("my_notes.txt", "Call mom")\nprint("Notes saved!")\n',
                        'solution_code': "from datetime import datetime\n\ndef save_note(filename, note):\n    with open(filename, 'a') as f:\n        f.write(f'[{datetime.now()}] {note}\\n')\n\nsave_note('my_notes.txt', 'Buy groceries')\nsave_note('my_notes.txt', 'Call mom')\nprint('Notes saved!')",
                        'difficulty': 'intermediate',
                        'xp_reward': 30,
                        'order': 1,
                    },
                ],
            },
            {
                'title': 'Error Handling',
                'slug': 'error-handling',
                'description': 'Handle errors gracefully and make robust programs.',
                'order': 3,
                'lessons': [
                    {
                        'title': 'Try/Except Blocks',
                        'slug': 'try-except',
                        'content': '<h2>Error Handling with Try/Except</h2><pre><code># Basic try/except\ntry:\n    number = int(input("Enter a number: "))\n    result = 10 / number\n    print(f"Result: {result}")\nexcept ValueError:\n    print("That\'s not a valid number!")\nexcept ZeroDivisionError:\n    print("You can\'t divide by zero!")\nexcept Exception as e:\n    print(f"An error occurred: {e}")\nelse:\n    print("No errors occurred!")\nfinally:\n    print("This always runs.")</code></pre><p>Common exception types:</p><ul><li><code>ValueError</code> - Wrong value type</li><li><code>TypeError</code> - Wrong operation on type</li><li><code>FileNotFoundError</code> - File doesn\'t exist</li><li><code>IndexError</code> - List index out of range</li><li><code>KeyError</code> - Dictionary key missing</li></ul>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Safe Division',
                        'slug': 'safe-division',
                        'instruction': '<h2>Safe Division Calculator</h2><p>Write a function <code>safe_divide(a, b)</code> that returns the result of a divided by b.</p><p>Handle these errors:</p><ul><li>If b is 0, return "Cannot divide by zero"</li><li>If inputs are not numbers, return "Invalid input"</li></ul>',
                        'starter_code': 'def safe_divide(a, b):\n    # Your code here\n    pass\n\nprint(safe_divide(10, 2))   # 5.0\nprint(safe_divide(10, 0))   # Cannot divide by zero\nprint(safe_divide(10, "a")) # Invalid input\n',
                        'solution_code': "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Cannot divide by zero'\n    except TypeError:\n        return 'Invalid input'\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))\nprint(safe_divide(10, 'a'))",
                        'difficulty': 'intermediate',
                        'xp_reward': 25,
                        'order': 1,
                    },
                ],
            },
            {
                'title': 'APIs & Requests',
                'slug': 'apis-requests',
                'description': 'Connect your Python programs to the internet.',
                'order': 4,
                'lessons': [
                    {
                        'title': 'Working with APIs',
                        'slug': 'working-with-apis',
                        'content': '<h2>Consuming APIs</h2><p>APIs let your program talk to other services over the internet.</p><pre><code>import requests\n\n# GET request\nresponse = requests.get("https://api.github.com/users/python")\ndata = response.json()  # Parse JSON\nprint(f"User: {data[\'login\']}")\nprint(f"Repos: {data[\'public_repos\']}")\n\n# POST request\nnew_data = {"title": "Learn Python", "completed": False}\nresponse = requests.post("https://jsonplaceholder.typicode.com/todos", json=new_data)\nprint(response.status_code)  # 201 (Created)\nprint(response.json())\n\n# Query parameters\nparams = {"q": "python", "page": 1}\nresponse = requests.get("https://api.github.com/search/repositories", params=params)\n\n# Headers\nheaders = {"Authorization": "Bearer YOUR_TOKEN"}\nresponse = requests.get("https://api.example.com/data", headers=headers)</code></pre><p>Always handle potential errors with try/except when making API calls!</p>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Weather Fetcher',
                        'slug': 'weather-fetcher',
                        'instruction': '<h2>Weather API Fetcher</h2><p>Write a function that fetches weather data from the Open-Meteo API (free, no key needed).</p><p>URL: <code>https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true</code></p><p>Print the current temperature from the response.</p>',
                        'starter_code': 'import requests\n\ndef get_weather():\n    # Your code here\n    pass\n\nget_weather()\n',
                        'solution_code': "import requests\n\ndef get_weather():\n    url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true'\n    response = requests.get(url)\n    data = response.json()\n    temp = data['current_weather']['temperature']\n    print(f'Current temperature: {temp}°C')\n\nget_weather()",
                        'difficulty': 'intermediate',
                        'xp_reward': 35,
                        'order': 1,
                    },
                ],
            },
        ],
    },
    # ===== LEVEL 3: REAL PYTHON PROJECTS =====
    {
        'course': {
            'title': 'Real Python Projects',
            'slug': 'real-python-projects',
            'description': 'Build real-world projects that you can use and show off. From a calculator to a Telegram bot and a full REST API - each project teaches practical skills.',
            'short_description': 'Calculator, password generator, web scraper, Telegram bot, weather app, REST API.',
            'icon': '🚀',
            'difficulty': 'intermediate',
            'order': 3,
            'is_published': True,
        },
        'modules': [
            {
                'title': 'Calculator & Tools',
                'slug': 'calculator-tools',
                'description': 'Build useful command-line tools.',
                'order': 1,
                'lessons': [
                    {
                        'title': 'Building a Calculator',
                        'slug': 'building-calculator',
                        'content': '<h2>Building a Calculator in Python</h2><p>In this project, you\'ll build a command-line calculator that can add, subtract, multiply, and divide.</p><p>Key concepts you\'ll use:</p><ul><li>Functions for each operation</li><li>User input with <code>input()</code></li><li>Conditional logic to choose the operation</li><li>A loop to keep the calculator running</li></ul>',
                        'lesson_type': 'text',
                        'xp_reward': 10,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Calculator Project',
                        'slug': 'calculator-project',
                        'instruction': '<h2>Command-Line Calculator</h2><p>Build a calculator that:</p><ol><li>Asks the user for two numbers</li><li>Asks for an operation (+, -, *, /)</li><li>Performs the calculation and shows the result</li><li>Keeps running until the user types "quit"</li></ol>',
                        'starter_code': "def calculator():\n    print('Simple Calculator')\n    print('Type \"quit\" to exit')\n    \n    while True:\n        # Your code here\n        pass\n\ncalculator()\n",
                        'solution_code': "def calculator():\n    print('Simple Calculator')\n    print('Type \"quit\" to exit')\n    \n    while True:\n        cmd = input('\\nEnter first number (or quit): ')\n        if cmd.lower() == 'quit':\n            break\n        \n        try:\n            a = float(cmd)\n            b = float(input('Enter second number: '))\n            op = input('Operation (+, -, *, /): ')\n            \n            if op == '+': result = a + b\n            elif op == '-': result = a - b\n            elif op == '*': result = a * b\n            elif op == '/': result = a / b if b != 0 else 'Error: div by 0'\n            else: result = 'Invalid operation'\n            \n            print(f'Result: {result}')\n        except ValueError:\n            print('Please enter valid numbers')\n\ncalculator()",
                        'difficulty': 'intermediate',
                        'xp_reward': 40,
                        'order': 1,
                    },
                    {
                        'title': 'Password Generator',
                        'slug': 'password-generator',
                        'instruction': '<h2>Password Generator</h2><p>Write a function <code>generate_password(length=12)</code> that creates a random password with:</p><ul><li>Uppercase and lowercase letters</li><li>Numbers</li><li>Special characters (!@#$%^&*)</li></ul><p>Tip: Use <code>import string</code> and <code>random.choice()</code></p>',
                        'starter_code': 'import string\nimport random\n\ndef generate_password(length=12):\n    # Your code here\n    pass\n\nprint(generate_password())\nprint(generate_password(16))\n',
                        'solution_code': "import string\nimport random\n\ndef generate_password(length=12):\n    chars = string.ascii_letters + string.digits + '!@#$%^&*'\n    password = ''.join(random.choice(chars) for _ in range(length))\n    return password\n\nprint(generate_password())\nprint(generate_password(16))",
                        'difficulty': 'intermediate',
                        'xp_reward': 30,
                        'order': 2,
                    },
                ],
            },
            {
                'title': 'Web Scraping & Bots',
                'slug': 'web-scraping-bots',
                'description': 'Extract data from websites and build Telegram bots.',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Web Scraping',
                        'slug': 'web-scraping',
                        'content': '<h2>Web Scraping with Python</h2><p>Web scraping extracts data from websites. We use <code>requests</code> to get the page and <code>BeautifulSoup</code> to parse HTML.</p><pre><code>import requests\nfrom bs4 import BeautifulSoup\n\nurl = "https://example.com"\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.text, \'html.parser\')\n\n# Find by tag\nheadlines = soup.find_all("h1")\nfor h in headlines:\n    print(h.text)\n\n# Find by class\nitems = soup.find_all(class_="item")\n\n# Find by ID\nmain = soup.find(id="main-content")\n\n# Find links\nlinks = soup.find_all("a")\nfor link in links:\n    print(link.get("href"))</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Quote Scraper',
                        'slug': 'quote-scraper',
                        'instruction': '<h2>Quote Scraper</h2><p>Scrape quotes from <code>http://quotes.toscrape.com</code> (a safe practice site).</p><p>Extract and print all quotes on the page. Each quote is in a <code>span</code> tag with class <code>text</code>.</p>',
                        'starter_code': 'import requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_quotes():\n    url = "http://quotes.toscrape.com"\n    # Your code here\n    pass\n\nscrape_quotes()\n',
                        'solution_code': "import requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_quotes():\n    url = 'http://quotes.toscrape.com'\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    quotes = soup.find_all('span', class_='text')\n    for q in quotes:\n        print(q.text)\n\nscrape_quotes()",
                        'difficulty': 'intermediate',
                        'xp_reward': 35,
                        'order': 1,
                    },
                ],
            },
        ],
    },
    # ===== LEVEL 4: AI & DATA SCIENCE =====
    {
        'course': {
            'title': 'Artificial Intelligence with Python',
            'slug': 'ai-with-python',
            'description': 'Dive into the world of AI and data science. Master NumPy, Pandas, machine learning fundamentals, and build intelligent applications like chatbots and AI agents.',
            'short_description': 'NumPy, Pandas, machine learning, AI APIs, chatbots, and automation.',
            'icon': '🤖',
            'difficulty': 'advanced',
            'order': 4,
            'is_published': True,
        },
        'modules': [
            {
                'title': 'NumPy & Data Basics',
                'slug': 'numpy-basics',
                'description': 'Master numerical computing with NumPy.',
                'order': 1,
                'lessons': [
                    {
                        'title': 'NumPy Arrays',
                        'slug': 'numpy-arrays',
                        'content': '<h2>NumPy - Numerical Python</h2><p>NumPy is the foundation of scientific computing in Python.</p><pre><code>import numpy as np\n\n# Creating arrays\narr = np.array([1, 2, 3, 4, 5])\nprint(arr)          # [1 2 3 4 5]\nprint(arr.shape)    # (5,)\n\n# 2D arrays (matrices)\nmatrix = np.array([[1, 2, 3], [4, 5, 6]])\nprint(matrix.shape)  # (2, 3)\n\n# Special arrays\nzeros = np.zeros((3, 3))\nones = np.ones((2, 4))\nrandom_arr = np.random.rand(3, 3)\nrange_arr = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]\n\n# Array operations\narr = np.array([1, 2, 3, 4, 5])\nprint(arr * 2)      # [2, 4, 6, 8, 10]\nprint(arr ** 2)     # [1, 4, 9, 16, 25]\nprint(arr.sum())    # 15\nprint(arr.mean())   # 3.0\nprint(arr.max())    # 5</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Array Statistics',
                        'slug': 'array-statistics',
                        'instruction': '<h2>Array Statistics</h2><p>Create a NumPy array of 20 random integers between 1 and 100.</p><p>Calculate and print:</p><ul><li>Mean, median, and standard deviation</li><li>Minimum and maximum values</li><li>Sum of all values</li></ul>',
                        'starter_code': 'import numpy as np\n\n# Create random array\narr = np.random.randint(1, 101, 20)\nprint("Array:", arr)\n\n# Your statistics here\n',
                        'solution_code': "import numpy as np\n\narr = np.random.randint(1, 101, 20)\nprint('Array:', arr)\nprint(f'Mean: {arr.mean():.2f}')\nprint(f'Median: {np.median(arr):.2f}')\nprint(f'Std: {arr.std():.2f}')\nprint(f'Min: {arr.min()}')\nprint(f'Max: {arr.max()}')\nprint(f'Sum: {arr.sum()}')",
                        'difficulty': 'intermediate',
                        'xp_reward': 25,
                        'order': 1,
                    },
                ],
            },
            {
                'title': 'Pandas & Data Analysis',
                'slug': 'pandas-data-analysis',
                'description': 'Analyze real data with Pandas DataFrames.',
                'order': 2,
                'lessons': [
                    {
                        'title': 'Pandas DataFrames',
                        'slug': 'pandas-dataframes',
                        'content': '<h2>Pandas DataFrames</h2><p>Pandas is the most popular library for data analysis in Python.</p><pre><code>import pandas as pd\n\n# Creating DataFrames\ndata = {\n    "Name": ["Alice", "Bob", "Charlie"],\n    "Age": [25, 30, 35],\n    "Salary": [50000, 60000, 70000]\n}\ndf = pd.DataFrame(data)\nprint(df)\n\n# Reading CSV\n# df = pd.read_csv("data.csv")\n\n# Basic exploration\nprint(df.head())      # First 5 rows\nprint(df.info())      # Column types\nprint(df.describe())  # Statistics\n\n# Selecting data\nprint(df["Name"])          # One column\nprint(df[["Name", "Age"]])  # Multiple columns\nprint(df.iloc[0])          # First row\nprint(df[df["Age"] > 28])  # Filter</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Employee Data Analysis',
                        'slug': 'employee-analysis',
                        'instruction': '<h2>Employee Data Analysis</h2><p>Create a DataFrame with employee data (Name, Department, Salary, Experience).</p><p>Then:</p><ol><li>Show employees with >5 years experience</li><li>Calculate average salary by department</li><li>Find the highest-paid employee</li></ol>',
                        'starter_code': 'import pandas as pd\n\n# Create employee data\nemployees = pd.DataFrame({\n    "Name": ["Alice", "Bob", "Charlie", "Diana", "Eve"],\n    "Department": ["Engineering", "Engineering", "Sales", "Sales", "Engineering"],\n    "Salary": [85000, 92000, 65000, 70000, 95000],\n    "Experience": [4, 8, 3, 6, 10]\n})\n\nprint(employees)\nprint()\n\n# Your analysis here\n',
                        'solution_code': "import pandas as pd\n\nemployees = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],\n    'Department': ['Engineering', 'Engineering', 'Sales', 'Sales', 'Engineering'],\n    'Salary': [85000, 92000, 65000, 70000, 95000],\n    'Experience': [4, 8, 3, 6, 10]\n})\n\nprint('Experienced (>5 years):')\nprint(employees[employees['Experience'] > 5])\nprint()\nprint('Average salary by department:')\nprint(employees.groupby('Department')['Salary'].mean())\nprint()\nprint('Highest paid:')\nprint(employees.loc[employees['Salary'].idxmax()])",
                        'difficulty': 'advanced',
                        'xp_reward': 30,
                        'order': 1,
                    },
                ],
            },
            {
                'title': 'Machine Learning Basics',
                'slug': 'ml-basics',
                'description': 'Introduction to machine learning with scikit-learn.',
                'order': 3,
                'lessons': [
                    {
                        'title': 'ML Concepts',
                        'slug': 'ml-concepts',
                        'content': '<h2>Machine Learning Fundamentals</h2><p>Machine learning teaches computers to learn from data without being explicitly programmed.</p><p><strong>Types of ML:</strong></p><ul><li><strong>Supervised Learning</strong> - Learn from labeled data (classification, regression)</li><li><strong>Unsupervised Learning</strong> - Find patterns in unlabeled data (clustering)</li><li><strong>Reinforcement Learning</strong> - Learn through trial and error</li></ul><p><strong>Basic workflow:</strong></p><ol><li>Collect and prepare data</li><li>Split into training and testing sets</li><li>Choose a model</li><li>Train the model</li><li>Evaluate performance</li><li>Make predictions</li></ol><pre><code>from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Load data (example)\nX = [[1, 2], [2, 3], [3, 4], [4, 5]]  # Features\ny = [0, 0, 1, 1]  # Labels\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(X, y)\n\n# Train\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)\n\n# Predict\npredictions = model.predict(X_test)\nprint(f"Accuracy: {accuracy_score(y_test, predictions)}")</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 20,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Iris Classifier',
                        'slug': 'iris-classifier',
                        'instruction': '<h2>Iris Flower Classifier</h2><p>Train a machine learning model on the famous Iris dataset to classify flower species.</p><p>Steps:</p><ol><li>Load the dataset from sklearn</li><li>Split into train/test</li><li>Train a classifier</li><li>Print the accuracy</li></ol>',
                        'starter_code': 'from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Load data\niris = load_iris()\nX, y = iris.data, iris.target\n\n# Your ML pipeline here\n',
                        'solution_code': "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\niris = load_iris()\nX, y = iris.data, iris.target\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\n\npredictions = model.predict(X_test)\naccuracy = accuracy_score(y_test, predictions)\nprint(f'Model accuracy: {accuracy:.2%}')\nprint(f'Correctly classified {sum(predictions == y_test)} out of {len(y_test)} flowers')",
                        'difficulty': 'advanced',
                        'xp_reward': 40,
                        'order': 1,
                    },
                ],
            },
            {
                'title': 'Chatbots & AI Agents',
                'slug': 'chatbots-ai-agents',
                'description': 'Build intelligent chatbots and AI-powered tools.',
                'order': 4,
                'lessons': [
                    {
                        'title': 'Building a Chatbot',
                        'slug': 'building-chatbot',
                        'content': '<h2>Building a Rule-Based Chatbot</h2><p>A simple chatbot uses pattern matching to respond to user input.</p><pre><code>import re\n\ndef get_response(user_input):\n    user_input = user_input.lower()\n    \n    if "hello" in user_input or "hi" in user_input:\n        return "Hello! How can I help you today?"\n    elif "name" in user_input:\n        return "I\'m PythonBot, your AI assistant!"\n    elif "weather" in user_input:\n        return "I can check the weather for you. Which city?"\n    elif "bye" in user_input:\n        return "Goodbye! Happy coding!"\n    else:\n        return "I\'m not sure how to respond to that. Can you rephrase?"\n\n# Chat loop\nprint("Chatbot: Hi! Type \'bye\' to exit.")\nwhile True:\n    user = input("You: ")\n    if user.lower() == "bye":\n        print("Chatbot: Goodbye!")\n        break\n    print(f"Chatbot: {get_response(user)}")</code></pre>',
                        'lesson_type': 'text',
                        'xp_reward': 15,
                        'order': 1,
                    },
                ],
                'challenges': [
                    {
                        'title': 'Build a Chatbot',
                        'slug': 'build-chatbot',
                        'instruction': '<h2>Build Your Own Chatbot</h2><p>Create a chatbot that can respond to at least 5 different types of questions:</p><ul><li>Greetings</li><li>Questions about Python</li><li>Questions about the weather</li><li>Jokes (tell a random joke)</li><li>Farewell</li></ul><p>Bonus: Use the <code>random</code> module to give varied responses!</p>',
                        'starter_code': ("import random\n\ndef get_response(user_input):\n    user_input = user_input.lower()\n"
                                       "    # Your chatbot logic here\n"
                                       '    return "I\'m learning to respond better!"\n\n'
                                       "# Test your chatbot\n"
                                       'print(get_response("hello"))\n'
                                       'print(get_response("what is Python?"))\n'
                                       'print(get_response("tell me a joke"))\n'),
                        'solution_code': "import random\n\ndef get_response(user_input):\n    user_input = user_input.lower()\n    \n    greetings = ['Hi there!', 'Hello!', 'Hey! How can I help?']\n    jokes = [\n        'Why do programmers prefer dark mode? Because light attracts bugs!',\n        'What do you call a snake that builds websites? A python developer!',\n        'Why did the programmer quit his job? He didn\\'t get arrays!'\n    ]\n    \n    if any(w in user_input for w in ['hi', 'hello', 'hey']):\n        return random.choice(greetings)\n    elif 'python' in user_input:\n        return 'Python is a versatile programming language great for beginners and experts alike!'\n    elif 'weather' in user_input:\n        return 'I can\\'t access live weather yet, but you can use the Open-Meteo API!'\n    elif 'joke' in user_input:\n        return random.choice(jokes)\n    elif 'bye' in user_input or 'goodbye' in user_input:\n        return 'Goodbye! Keep coding!'\n    else:\n        return \"That's interesting! Tell me more.\"\n\nprint(get_response('hello'))\nprint(get_response('what is Python?'))\nprint(get_response('tell me a joke'))\nprint(get_response('bye'))",
                        'difficulty': 'advanced',
                        'xp_reward': 35,
                        'order': 1,
                    },
                ],
            },
        ],
    },
]


class Command(BaseCommand):
    help = 'Seed courses, modules, lessons, challenges, and quizzes into the database'

    def handle(self, *args, **options):
        for course_data in CONTENT:
            course, created = Course.objects.get_or_create(
                slug=course_data['course']['slug'],
                defaults=course_data['course'],
            )
            if not created:
                Course.objects.filter(slug=course.slug).update(**course_data['course'])
                course.refresh_from_db()
                self.stdout.write(self.style.WARNING(f'Updated course: {course.title}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Created course: {course.title}'))

            for mod_data in course_data['modules']:
                module, _ = Module.objects.get_or_create(
                    course=course,
                    slug=mod_data['slug'],
                    defaults={
                        'title': mod_data['title'],
                        'description': mod_data.get('description', ''),
                        'order': mod_data['order'],
                    },
                )

                for lesson_data in mod_data.get('lessons', []):
                    Lesson.objects.get_or_create(
                        module=module,
                        slug=lesson_data['slug'],
                        defaults={
                            'title': lesson_data['title'],
                            'content': lesson_data['content'],
                            'lesson_type': lesson_data['lesson_type'],
                            'xp_reward': lesson_data['xp_reward'],
                            'order': lesson_data['order'],
                        },
                    )

                for challenge_data in mod_data.get('challenges', []):
                    CodeChallenge.objects.get_or_create(
                        module=module,
                        slug=challenge_data['slug'],
                        defaults={
                            'title': challenge_data['title'],
                            'instruction': challenge_data['instruction'],
                            'starter_code': challenge_data['starter_code'],
                            'solution_code': challenge_data['solution_code'],
                            'difficulty': challenge_data['difficulty'],
                            'xp_reward': challenge_data['xp_reward'],
                            'order': challenge_data['order'],
                        },
                    )

                for quiz_data in mod_data.get('quizzes', []):
                    quiz, _ = Quiz.objects.get_or_create(
                        module=module,
                        slug=quiz_data['slug'],
                        defaults={'title': quiz_data['title'], 'xp_reward': quiz_data['xp_reward'], 'order': quiz_data['order']},
                    )
                    for q_data in quiz_data.get('questions', []):
                        question, _ = Question.objects.get_or_create(
                            quiz=quiz,
                            question_text=q_data['question_text'],
                            defaults={'question_type': q_data['question_type'], 'order': q_data['order']},
                        )
                        for a_data in q_data.get('answers', []):
                            Answer.objects.get_or_create(
                                question=question,
                                answer_text=a_data['answer_text'],
                                defaults={'is_correct': a_data['is_correct']},
                            )

        self.stdout.write(self.style.SUCCESS('All courses seeded successfully!'))
