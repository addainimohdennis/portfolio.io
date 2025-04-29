// Three.js Black Hole Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Black Hole (simplified as a dark sphere with distortion)
const bhGeometry = new THREE.SphereGeometry(5, 32, 32);
const bhMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const blackHole = new THREE.Mesh(bhGeometry, bhMaterial);
scene.add(blackHole);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const starVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 20;

function animate() {
    requestAnimationFrame(animate);
    blackHole.rotation.y += 0.002;
    stars.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 