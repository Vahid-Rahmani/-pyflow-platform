from .models import User


ROADMAPS = {
    ('beginner', 'learn'): {
        'title': 'Python from Zero',
        'description': 'Start your programming journey from absolute basics to building your first Python projects.',
        'milestones': [
            {'title': 'Welcome to Python', 'description': 'Install Python, write your first program, understand basic syntax'},
            {'title': 'Variables & Data Types', 'description': 'Numbers, strings, booleans, and how to store data'},
            {'title': 'Control Flow', 'description': 'if/else statements, loops, and logical thinking'},
            {'title': 'Functions & Modules', 'description': 'Write reusable code, import libraries, organize your programs'},
            {'title': 'Data Structures', 'description': 'Lists, dictionaries, tuples, sets - master Python collections'},
            {'title': 'Your First Project', 'description': 'Build a complete program: calculator, quiz game, or to-do app'},
        ],
    },
    ('beginner', 'job'): {
        'title': 'Career Path: Python Developer',
        'description': 'Go from beginner to job-ready Python developer with real-world projects and portfolio building.',
        'milestones': [
            {'title': 'Python Fundamentals', 'description': 'Master Python basics - syntax, data types, control flow'},
            {'title': 'Object-Oriented Programming', 'description': 'Classes, inheritance, polymorphism - think like a developer'},
            {'title': 'Version Control with Git', 'description': 'Learn Git and GitHub for collaborative development'},
            {'title': 'Databases & SQL', 'description': 'CRUD operations, database design, SQLite and PostgreSQL'},
            {'title': 'Web APIs & Flask/Django', 'description': 'Build REST APIs, understand HTTP, create web applications'},
            {'title': 'Portfolio Project', 'description': 'Build a full-stack application to showcase to employers'},
            {'title': 'Job Preparation', 'description': 'Code interviews, resume tips, open source contributions'},
        ],
    },
    ('beginner', 'ai'): {
        'title': 'AI & Machine Learning Fundamentals',
        'description': 'Learn Python and step into the world of artificial intelligence.',
        'milestones': [
            {'title': 'Python for Data Science', 'description': 'Python basics with focus on data manipulation'},
            {'title': 'NumPy & Pandas', 'description': 'Master numerical computing and data analysis'},
            {'title': 'Data Visualization', 'description': 'Matplotlib, Seaborn - tell stories with data'},
            {'title': 'Machine Learning Basics', 'description': 'Supervised vs unsupervised learning, scikit-learn'},
            {'title': 'Neural Networks', 'description': 'Deep learning fundamentals with TensorFlow/PyTorch'},
            {'title': 'AI Project', 'description': 'Build a real AI application: image classifier or chatbot'},
        ],
    },
    ('beginner', 'automate'): {
        'title': 'Python Automation Expert',
        'description': 'Automate repetitive tasks, process files, scrape the web, and save hours every day.',
        'milestones': [
            {'title': 'Python Quick Start', 'description': 'Essential Python for automation'},
            {'title': 'File & Directory Operations', 'description': 'Read, write, organize files automatically'},
            {'title': 'Web Scraping', 'description': 'BeautifulSoup, Scrapy - extract data from websites'},
            {'title': 'APIs & Data Pipelines', 'description': 'Connect services, fetch data, automate workflows'},
            {'title': 'Scheduling & Scripts', 'description': 'Automate scripts to run on schedule, email reports'},
            {'title': 'Automation Project', 'description': 'Build an end-to-end automation system'},
        ],
    },
    ('beginner', 'web'): {
        'title': 'Web Development with Python',
        'description': 'Build modern websites and web applications using Python and Django.',
        'milestones': [
            {'title': 'Python Essentials', 'description': 'Core Python for web development'},
            {'title': 'HTML/CSS Fundamentals', 'description': 'Build and style web pages'},
            {'title': 'Django Basics', 'description': 'Models, views, templates - your first web app'},
            {'title': 'Databases & Authentication', 'description': 'User systems, database design, security'},
            {'title': 'Frontend & APIs', 'description': 'REST APIs, JavaScript basics, connecting frontend to backend'},
            {'title': 'Deploy Your Website', 'description': 'Launch your site to the internet'},
            {'title': 'Portfolio Project', 'description': 'Build a complete production-ready website'},
        ],
    },
    ('beginner', 'apps'): {
        'title': 'Build Apps with Python',
        'description': 'Create desktop and mobile applications using Python frameworks.',
        'milestones': [
            {'title': 'Python Core', 'description': 'Python fundamentals for app development'},
            {'title': 'GUI Programming', 'description': 'Tkinter, PyQt - build desktop applications'},
            {'title': 'Data Persistence', 'description': 'Local storage, databases for your apps'},
            {'title': 'APIs & Networking', 'description': 'Connect your apps to the internet'},
            {'title': 'App Packaging & Distribution', 'description': 'Package and share your applications'},
            {'title': 'Capstone App', 'description': 'Build and publish a complete application'},
        ],
    },
}

# For users with basic/intermediate/advanced level, provide faster tracks
ACCELERATED_ROADMAPS = {
    ('basic', 'ai'): {
        'title': 'Accelerated AI Path',
        'description': 'Skip Python basics and dive straight into data science and AI.',
        'milestones': [
            {'title': 'Python Refresher', 'description': 'Quick review of Python for experienced learners'},
            {'title': 'NumPy & Pandas Deep Dive', 'description': 'Advanced data manipulation'},
            {'title': 'Machine Learning', 'description': 'scikit-learn, model evaluation, feature engineering'},
            {'title': 'Deep Learning', 'description': 'Neural networks, CNNs, RNNs with TensorFlow'},
            {'title': 'AI Project', 'description': 'Build a production-ready AI system'},
        ],
    },
    ('intermediate', 'job'): {
        'title': 'Fast Track to Developer Job',
        'description': 'For experienced programmers transitioning to Python development.',
        'milestones': [
            {'title': 'Python Mastery', 'description': 'Advanced Python patterns and best practices'},
            {'title': 'System Design', 'description': 'Architecture, scalability, design patterns'},
            {'title': 'Full-Stack Project', 'description': 'Build a complex full-stack application'},
            {'title': 'Interview Prep', 'description': 'Algorithms, system design, behavioral interviews'},
        ],
    },
}

ALL_ROADMAPS = {**ROADMAPS, **ACCELERATED_ROADMAPS}


def generate_roadmap(user: User) -> dict:
    key = (user.programming_level, user.goal)
    roadmap = ALL_ROADMAPS.get(key)

    if not roadmap:
        roadmap = ROADMAPS.get(('beginner', 'learn'), {
            'title': 'Custom Learning Path',
            'description': 'A personalized path based on your profile.',
            'milestones': [{'title': 'Get Started', 'description': 'Begin your learning journey'}],
        })

    return roadmap


def get_available_roadmaps():
    return [
        {
            'key': f'{level}_{goal}',
            'level': dict(User.PROGRAMMING_LEVELS).get(level, level),
            'goal': dict(User.GOAL_CHOICES).get(goal, goal),
            'path': data['title'],
            'description': data['description'],
            'milestone_count': len(data['milestones']),
        }
        for (level, goal), data in ALL_ROADMAPS.items()
    ]
