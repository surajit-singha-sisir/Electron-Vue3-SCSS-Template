<template>
    <WelcomeLayout>

        <div class="welcome-container">
            <section class="center-section">
                <h1 class="title animate-bounce-in">CONGRATULATIONS</h1>
                <h2 class="subtitle animate-slide-up">
                    You have successfully completed the installation process
                </h2>
                <button type="button" class="dashboard-button" @click="goToDashboard">
                    <span class="button-text">Go to Dashboard</span>
                    <span class="button-hover-effect"></span>
                </button>
            </section>
            <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
        </div>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const confettiCanvas = ref<HTMLCanvasElement | null>(null);

const goToDashboard = () => {
    // router.push('/dashboard');
};

const createConfetti = () => {
    if (!confettiCanvas.value) return;

    const canvas = confettiCanvas.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;
        shape: string;
    }[] = [];

    // Colors and shapes for confetti
    const colors = ['#FFD700', '#FF69B4', '#00FF00', '#1E90FF', '#FF4500'];
    const shapes = ['circle', 'square', 'star'];

    // Create particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Start above the screen
            size: Math.random() * 10 + 5,
            speedX: (Math.random() - 0.5) * 4, // Horizontal drift
            speedY: Math.random() * 3 + 2, // Fall speed
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
    }

    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.size *= 0.98;

            ctx.fillStyle = p.color;
            ctx.beginPath();

            if (p.shape === 'circle') {
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            } else if (p.shape === 'square') {
                ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            } else if (p.shape === 'star') {
                // Simple star shape
                const points = 5;
                const outerRadius = p.size / 2;
                const innerRadius = outerRadius / 2;
                ctx.moveTo(p.x, p.y - outerRadius);
                for (let i = 0; i < points * 2; i++) {
                    const r = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (Math.PI / points) * i - Math.PI / 2;
                    ctx.lineTo(
                        p.x + r * Math.cos(angle),
                        p.y + r * Math.sin(angle)
                    );
                }
                ctx.closePath();
            }

            ctx.fill();

            if (p.y > canvas.height || p.size < 1) {
                p.x = Math.random() * canvas.width;
                p.y = -p.size;
                p.size = Math.random() * 10 + 5;
                p.speedX = (Math.random() - 0.5) * 4;
                p.speedY = Math.random() * 3 + 2;
            }
        });

        animationId = requestAnimationFrame(animate);
    };

    let animationId = requestAnimationFrame(animate);

};

onMounted(() => {
    createConfetti();
});
</script>

<style scoped>
.welcome-container {
    display: block;
    position: relative;
    overflow: hidden;
    z-index: 4;
}

.center-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    height: 100vh;
    position: relative;
    z-index: 10;
}

.title {
    font-size: 3rem;
    font-weight: bold;
    color: #00f159;
}

.subtitle {
    font-size: 1.5rem;
    color: #e9de42;
}

.dashboard-button {
    position: relative;
    overflow: hidden;
    padding: 0.75rem 1.5rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.dashboard-button:hover {
    background-color: #1d4ed8;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.button-text {
    position: relative;
    z-index: 10;
    transition: color 0.3s;
}

.button-hover-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #16a34a;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
}

.dashboard-button:hover .button-hover-effect {
    transform: translateX(0);
}

.confetti-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
}

.animate-bounce-in {
    animation: bounce-in 1s ease-out;
}

.animate-slide-up {
    animation: slide-up 0.8s ease-out 0.3s both;
}

@keyframes bounce-in {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }

    60% {
        transform: scale(1.2);
        opacity: 1;
    }

    100% {
        transform: scale(1);
    }
}

@keyframes slide-up {
    0% {
        transform: translateY(50px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>