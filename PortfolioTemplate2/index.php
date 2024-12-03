<?php
$config = include 'config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($config['name']) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            scroll-behavior: smooth;
        }
        h1 {
        background-image: linear-gradient(to right, #7e6ec4, #5443a3);
        -webkit-background-clip: text;
        color: transparent;
    }
        .hover-effect {
            position: relative;
            overflow: hidden;
        }
        .hover-effect .cursor {
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            filter: blur(10px);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        .hover-effect:hover .cursor {
            opacity: 1;
        }
    </style>
    <script>
    // Smooth scroll for links
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    });
</script>

    <script>
        // Mouse tracking function within boxes
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.hover-effect').forEach(element => {
                const cursor = element.querySelector('.cursor');
                element.addEventListener('mousemove', e => {
                    const rect = element.getBoundingClientRect();
                    cursor.style.left = `${e.clientX - rect.left}px`;
                    cursor.style.top = `${e.clientY - rect.top}px`;
                });
            });
        });
    </script>
</head>
<body class="bg-gray-900 text-white font-sans">
    <!-- Hero Section -->
    <header class="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 class="text-5xl font-bold"><?= htmlspecialchars($config['name']) ?></h1>
        <p class="text-lg mt-4 text-gray-400"><?= htmlspecialchars($config['position']) ?></p>
        <a href="#about" class="mt-6 inline-block bg-[#5F4BB6] text-white px-6 py-3 rounded-full hover:bg-[#5443a3]">
            Learn More
        </a>
    </header>

    <!-- About Section -->
    <section id="about" class="py-20">
        <div class="container mx-auto text-center max-w-3xl">
            <h2 class="text-4xl font-semibold mb-6">About Me</h2>
            <p class="text-gray-400"><?= htmlspecialchars($config['aboutme']) ?></p>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="py-20">
        <div class="container mx-auto">
            <h2 class="text-4xl font-semibold text-center mb-12">Skills</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <?php foreach ($config['skills'] as $skill): ?>
                    <div class="bg-gray-800 text-center py-6 rounded-lg shadow-md hover-effect">
                        <div class="cursor"></div>
                        <?= htmlspecialchars($skill) ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section class="py-20">
        <div class="container mx-auto">
            <h2 class="text-4xl font-semibold text-center mb-12">Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($config['projects'] as $project): ?>
                    <a target="_blank" href="<?= htmlspecialchars($project['link']) ?>" class="block group hover-effect relative overflow-hidden rounded-lg shadow-lg">
                        <div class="cursor"></div>
                        <img src="<?= htmlspecialchars($project['image']) ?>" alt="<?= htmlspecialchars($project['title']) ?>" class="w-full h-48 object-cover">
                        <div class="absolute inset-0 bg-gray-900 bg-opacity-60 flex flex-col justify-end p-4">
                            <h3 class="text-lg font-bold text-white"><?= htmlspecialchars($project['title']) ?></h3>
                            <p class="text-gray-300 text-sm"><?= htmlspecialchars($project['description']) ?></p>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20">
        <div class="container mx-auto text-center">
            <h2 class="text-4xl font-semibold mb-6">Contact</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">Email</h3>
                    <p><?= htmlspecialchars($config['contact']['email']) ?></p>
                </div>
                <div class="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">Phone</h3>
                    <p><?= htmlspecialchars($config['contact']['phone']) ?></p>
                </div>
                <div class="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">LinkedIn</h3>
                    <a target="_blank" href="https://www.linkedin.com/in/<?= htmlspecialchars($config['contact']['linkedin']) ?>/" class="text-[#7e6ec4] hover:text-[#6e5cbc]">@<?= htmlspecialchars($config['contact']['linkedin']) ?></a>
                </div>
                <div class="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold mb-2">GitHub</h3>
                    <a target="_blank" href="https://github.com/<?= htmlspecialchars($config['contact']['github']) ?>/" class="text-[#7e6ec4] hover:text-[#6e5cbc]">@<?= htmlspecialchars($config['contact']['github']) ?></a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-6 text-center text-gray-500">
        &copy; <?= date('Y') ?> Ondrej Pacovsky. All rights reserved. <b>#HighSeas 💖</b>
    </footer>
</body>
</html>