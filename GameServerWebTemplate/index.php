<?php include('config.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title><?php echo strtoupper(SERVER_NAME); ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- FontAwesome CDN -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
     <!-- Tailwind.css -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        html { scroll-behavior: smooth; }
        :root {
            --primary-color: <?php echo PRIMARY_COLOR; ?>;
            --secondary-color: <?php echo SECONDARY_COLOR; ?>;
            --accent-color: <?php echo ACCENT_COLOR; ?>;
            --background-color: <?php echo BACKGROUND_COLOR; ?>;
            --text-color: <?php echo TEXT_COLOR; ?>;
            --border-color: <?php echo BORDER_COLOR; ?>;
            --navbar-hover-color: <?php echo NAVBAR_HOVER_COLOR; ?>;
        }
    </style>
</head>
<body class="bg-[var(--background-color)] text-[var(--text-color)] font-sans">

    <!-- Navbar -->
    <nav class="bg-[var(--secondary-color)] py-4 fixed w-full z-50 top-0 left-0 shadow-lg">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center space-x-3">
                <img src="https://via.placeholder.com/40" alt="Logo" class="w-10 h-10 rounded-lg">
                <h1 class="text-2xl font-bold text-[var(--primary-color)]"><?php echo strtoupper(SERVER_NAME); ?></h1>
            </div>
            <!-- Links -->
            <div class="space-x-8 text-lg hidden md:block">
                <a href="#servers" class="text-white hover:text-[var(--navbar-hover-color)] transition-colors">Server List</a>
                <a href="#store" class="text-white hover:text-[var(--navbar-hover-color)] transition-colors">Store</a>
                <a href="#about" class="text-white hover:text-[var(--navbar-hover-color)] transition-colors">About Us</a>
                <a href="#admin-team" class="text-white hover:text-[var(--navbar-hover-color)] transition-colors">Admin Team</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="bg-cover bg-center h-[80vh] flex items-center justify-center relative mt-16" style="background-image: url('<?php echo HEADER_IMAGE; ?>');">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-10 text-center text-white px-6 py-8">
            <h1 class="text-5xl sm:text-5xl lg:text-6xl font-extrabold">WELCOME TO <span class="text-[var(--primary-color)]"><?php echo strtoupper(SERVER_NAME); ?></span></h1>
            <p class="mt-4 text-xl sm:text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis tellus faucibus, iaculis eros at, varius diam.</p>
            <a href="#servers" class="mt-6 inline-block px-8 py-4 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--accent-color)] transition-all">Let's play!</a>
        </div>
    </header>
    <!-- Server List Section -->
    <section id="servers" class="py-16 bg-[var(--secondary-color)]">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="text-5xl font-bold text-[var(--primary-color)] mt-10 mb-8">SERVER LIST</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <?php
        foreach ($servers as $server) {
            $server['status'] = "offline";
            echo "<div class='bg-gray-800 rounded-lg overflow-hidden border-2 border-[var(--border-color)] md:w-full w-90 mx-auto'>
                    <img src='{$server['image']}' alt='{$server['name']}' class='w-full h-56 object-cover'>
                    <div class='p-6'>
                        <h3 class='text-xl font-semibold mb-4'>{$server['name']}</h3>

                        <div class='flex justify-center items-center text-gray-300'>
                            <i class='fas fa-users mr-2'></i><span>0/999</span>
                        </div>
                        <div class='flex justify-center items-center text-gray-300'>
                            <i class='fas fa-map mr-2'></i><span>Map: N/A</span>
                        </div>
                        <div class='flex justify-center items-center text-gray-300'>
                            <i class='fas fa-laptop mr-2'></i><span>IP: {$server['ip']}</span>
                        </div>
                        <p class='mt-2 text-sm text-".($server['status'] == 'online' ? 'green' : 'red')."-500'>Status: ".ucfirst($server['status'])."</p>
                        <a href='{$server['join_link']}' class='mt-4 inline-block px-8 py-3 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--accent-color)] transition-all'>Connect</a>
                    </div>
                </div>";
        }
    ?>
</div>
 </div>
    </section>

    <!-- Store Section -->
    <section id="store" class="py-16 bg-[var(--secondary-color)]">
        <div class="max-w-7xl mx-auto text-center text-white">
            <h2 class="text-5xl font-bold text-[var(--primary-color)] mt-10 mb-8">VISIT OUR STORE</h2>
            <p class="text-lg max-w-2xl mx-auto mb-6"><?php echo STORE_DESCRIPTION; ?></p>
            <a href="<?php echo STORE_LINK ?>" class="inline-block px-8 py-4 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--accent-color)] transition-all">Visit Store</a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-[var(--secondary-color)]">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="text-5xl font-bold text-[var(--primary-color)] mb-8">ABOUT US</h2>
            <p class="text-lg text-white max-w-2xl mx-auto w-11/12 md:w-full"><?php echo ABOUT_US_TEXT ?></p>
        </div>
    </section>

<!-- Admin Team Section -->
<section id="admin-team" class="py-16 bg-[var(--secondary-color)]">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="text-5xl font-bold text-[var(--primary-color)] mb-8">MEET OUR AMAZING TEAM!</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php
                    foreach ($admin_team as $admin) {
                        echo "<div class='bg-gray-800 p-6 rounded-lg border-2 border-[var(--border-color)] w-11/12 md:w-full mx-auto'>
                                <img src='{$admin['image']}' alt='{$admin['name']}' class='w-32 h-32 mx-auto rounded-full mb-4'>
                                <h3 class='text-xl font-semibold'>{$admin['name']}</h3>
                                <p class='text-gray-300'>{$admin['role']}</p>
                            </div>";
                    }
                ?>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[var(--secondary-color)] py-8 text-center mt-0">
    <p>© 2024 <a target="_blank" href="https://ondrejpacovsky.cz">Ondrej Pacovsky</a>. All rights reserved. #HighSeas 💖</p>
    </footer>

</body>
</html>
