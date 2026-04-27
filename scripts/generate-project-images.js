const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), 'public/assets/images/projects');
fs.mkdirSync(outputDir, { recursive: true });

const W = 800, H = 600;

function hexPath(ctx, cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawSubtleGrid(ctx) {
  ctx.strokeStyle = 'rgba(0,0,0,0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function drawText(ctx, title, subtitle) {
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 72px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(title, W / 2, H - 100);
  ctx.fillStyle = '#888888';
  ctx.font = '20px monospace';
  ctx.fillText(subtitle, W / 2, H - 60);
}

const projects = [
  {
    filename: 'xyuss-design-system.png',
    bg: '#e8e0d0',
    title: 'XYUSS',
    subtitle: 'Design System',
    draw(ctx) {
      drawSubtleGrid(ctx);
      const cols = 3, rows = 2;
      const rectW = 120, rectH = 80, gap = 24;
      const totalW = cols * rectW + (cols - 1) * gap;
      const totalH = rows * rectH + (rows - 1) * gap;
      const startX = (W - totalW) / 2;
      const startY = (H - totalH) / 2 - 40;
      const colors = ['#c8bfa8','#b8af98','#a89f88','#d8cfc0','#c0b8a8','#b0a898'];
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.fillStyle = colors[i++];
          ctx.fillRect(startX + c * (rectW + gap), startY + r * (rectH + gap), rectW, rectH);
          ctx.strokeStyle = 'rgba(0,0,0,0.1)';
          ctx.lineWidth = 1;
          ctx.strokeRect(startX + c * (rectW + gap), startY + r * (rectH + gap), rectW, rectH);
        }
      }
    }
  },
  {
    filename: 'aura-minimalist-commerce.png',
    bg: '#ede8df',
    title: 'AURA',
    subtitle: 'Minimalist Commerce',
    draw(ctx) {
      drawSubtleGrid(ctx);
      // Shopping bag
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(W/2 - 70, H/2 - 80, 140, 130);
      ctx.stroke();
      // Handle
      ctx.beginPath();
      ctx.arc(W/2, H/2 - 80, 35, Math.PI, 0);
      ctx.stroke();
      // Subtle detail line
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W/2 - 30, H/2 - 20);
      ctx.lineTo(W/2 + 30, H/2 - 20);
      ctx.stroke();
    }
  },
  {
    filename: 'nexus-wealth-analytics.png',
    bg: '#e2dcd0',
    title: 'NEXUS',
    subtitle: 'Wealth Analytics',
    draw(ctx) {
      drawSubtleGrid(ctx);
      // Chart grid lines
      ctx.strokeStyle = '#c8c0b0';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = 120 + i * 60;
        ctx.beginPath(); ctx.moveTo(160, y); ctx.lineTo(640, y); ctx.stroke();
      }
      // Ascending line chart
      const points = [
        [160, 340], [240, 290], [320, 260], [400, 210],
        [480, 180], [560, 140], [640, 110]
      ];
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      points.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
      ctx.stroke();
      // Dots
      ctx.fillStyle = '#1a1a1a';
      points.forEach(([x, y]) => {
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      });
    }
  },
  {
    filename: 'ethera-nft-gallery.png',
    bg: '#ddd8ce',
    title: 'ETHERA',
    subtitle: 'NFT Gallery',
    draw(ctx) {
      drawSubtleGrid(ctx);
      // Outer hexagon
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      hexPath(ctx, W/2, H/2 - 40, 110);
      ctx.stroke();
      // Inner hexagon
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      hexPath(ctx, W/2, H/2 - 40, 70);
      ctx.stroke();
      // Center dot
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(W/2, H/2 - 40, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  },
];

projects.forEach(project => {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = project.bg;
  ctx.fillRect(0, 0, W, H);

  // Draw project-specific illustration
  project.draw(ctx);

  // Title and subtitle
  drawText(ctx, project.title, project.subtitle);

  // Save
  const buffer = canvas.toBuffer('image/png');
  const filepath = path.join(outputDir, project.filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`Generated: ${project.filename}`);
});

console.log('All project images generated successfully.');
