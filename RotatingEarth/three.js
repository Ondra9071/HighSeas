const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // earth gen
        const textureLoader = new THREE.TextureLoader();
        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        const earthMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load('./textures/earth.jpg'),
            bumpMap: textureLoader.load('./textures/earth2.tif'),
            bumpScale: 0.1
        });
        const earthNightMaterial = new THREE.MeshStandardMaterial({
            map: textureLoader.load('./textures/earth_night.jpg'),
            bumpMap: textureLoader.load('./textures/earth2.tif'),
            bumpScale: 0.1
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        const starGeometry = new THREE.SphereGeometry(100, 64, 64);
        const starMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.BackSide
        });
        const stars = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(stars);

        earth.rotation.x = 0.45;
        camera.position.z = 3;

        let isDay = true;

        // day/night switch
        function switchToNight() {
            earth.material = earthNightMaterial;
            document.getElementById('switchButton').innerHTML = '<i class="fas fa-sun"></i>';
        }

        function switchToDay() {
            earth.material = earthMaterial;
            document.getElementById('switchButton').innerHTML = '<i class="fas fa-moon"></i>';
        }

        document.getElementById('switchButton').addEventListener('click', () => {
            if (isDay) {
                switchToNight();
            } else {
                switchToDay();
            }
            isDay = !isDay;
        });

        // loop
        function animate() {
            requestAnimationFrame(animate);
            earth.rotation.y += 0.001; // speed setting
            renderer.render(scene, camera);
        }

        animate();

        // resizing handle, responsivity
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });