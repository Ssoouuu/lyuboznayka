particlesJS('confetti', {
    particles: {
        number: { value: 80 },
        color: { value: ['#FFBD4D', '#22c55e', '#3b82f6', '#ef4444'] },
        shape: { type: 'circle' },
        opacity: { value: 0.8 },
        size: { value: 5 },
        line_linked: {
            enable: false
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'bottom',
            straight: false,
            out_mode: 'out' 
        }
    }
});