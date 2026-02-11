
function showPage(pageName) {
    
    var pages = document.querySelectorAll('main');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
        pages[i].classList.remove('page-enter');
    }

    
    var targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('page-enter');
    }

    
    var navLinks = document.querySelectorAll('.nav-link');
    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove('active');
        if (navLinks[j].getAttribute('data-page') === pageName) {
            navLinks[j].classList.add('active');
        }
    }

    if (pageName === 'weapons') {
        animateWeaponBars();
    }

    if (pageName === 'home') {
        animateCounters();
    }

    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function showTab(tabName) {
    
    var tabs = document.querySelectorAll('.tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active-content');
    }

  
    var btns = document.querySelectorAll('.tab-btn');
    for (var j = 0; j < btns.length; j++) {
        btns[j].classList.remove('active-tab');
    }

    
    var targetTab = document.getElementById('tab-' + tabName);
    if (targetTab) {
        targetTab.classList.add('active-content');
    }

 
    event.target.classList.add('active-tab');
}


function toggleAccordion(header) {
    var item = header.parentElement;
    var isOpen = item.classList.contains('open');

   
    var allItems = document.querySelectorAll('.accordion-item');
    for (var i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove('open');
    }

   
    if (!isOpen) {
        item.classList.add('open');
    }
}


function animateCounters() {
    var counters = document.querySelectorAll('.stat-number');
    for (var i = 0; i < counters.length; i++) {
        var counter = counters[i];
        var target = parseInt(counter.getAttribute('data-target'));
        var current = 0;
        var increment = Math.ceil(target / 60);
        var duration = 2000;
        var stepTime = duration / (target / increment);

        animateCounter(counter, current, target, increment, stepTime);
    }
}

function animateCounter(element, current, target, increment, stepTime) {
    if (current < target) {
        current += increment;
        if (current > target) current = target;
        element.textContent = current.toLocaleString();
        setTimeout(function() {
            animateCounter(element, current, target, increment, stepTime);
        }, stepTime);
    }
}


function animateWeaponBars() {
    var bars = document.querySelectorAll('.bar-fill');
    for (var i = 0; i < bars.length; i++) {
        var bar = bars[i];
        var width = bar.style.width;
        bar.style.width = '0%';
        (function(b, w) {
            setTimeout(function() {
                b.style.width = w;
            }, 100);
        })(bar, width);
    }
}


function createBloodParticle() {
    var particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 8 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(255, 0, 0, ' + (Math.random() * 0.5 + 0.2) + ')';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.transition = 'none';
    document.body.appendChild(particle);

    var posY = -10;
    var posX = parseFloat(particle.style.left);
    var speed = Math.random() * 3 + 1;
    var drift = (Math.random() - 0.5) * 2;

    function fall() {
        posY += speed;
        posX += drift;
        particle.style.top = posY + 'px';
        particle.style.left = posX + 'px';

        if (posY < window.innerHeight) {
            requestAnimationFrame(fall);
        } else {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    }

    requestAnimationFrame(fall);
}

setInterval(createBloodParticle, 300);

document.addEventListener('click', function(e) {
    for (var i = 0; i < 8; i++) {
        var spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.width = '6px';
        spark.style.height = '6px';
        spark.style.backgroundColor = i % 2 === 0 ? '#ff0000' : '#ffff00';
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '10000';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.boxShadow = '0 0 10px ' + (i % 2 === 0 ? '#ff0000' : '#ffff00');
        document.body.appendChild(spark);

        var angle = (Math.PI * 2 / 8) * i;
        var velocity = Math.random() * 80 + 40;
        var targetX = e.clientX + Math.cos(angle) * velocity;
        var targetY = e.clientY + Math.sin(angle) * velocity;

        animateSpark(spark, e.clientX, e.clientY, targetX, targetY);
    }
});

function animateSpark(spark, startX, startY, endX, endY) {
    var startTime = performance.now();
    var duration = 500;

    function animate(currentTime) {
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);

        spark.style.left = startX + (endX - startX) * eased + 'px';
        spark.style.top = startY + (endY - startY) * eased + 'px';
        spark.style.opacity = 1 - progress;
        spark.style.transform = 'scale(' + (1 - progress) + ')';

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }
    }

    requestAnimationFrame(animate);
}

function handleScrollAnimations() {
    var elements = document.querySelectorAll('.errorse li, .can, .divider, .video-container, .weapon-card, .item-card, .class-card, .enemy-card, .news-card, .tip-card, .location-card, .stat-card, .currency-card');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var rect = element.getBoundingClientRect();
        var isVisible = rect.top < window.innerHeight - 100;

        if (isVisible && !element.classList.contains('scroll-visible')) {
            element.classList.add('scroll-visible');
            element.style.opacity = '1';
        }
    }
}

window.addEventListener('scroll', handleScrollAnimations);


var listItems = document.querySelectorAll('.errorse li');
for (var k = 0; k < listItems.length; k++) {
    listItems[k].addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.8)';
    });
    listItems[k].addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
}


var visits = localStorage.getItem('deadrails_visits');
if (visits) {
    visits = parseInt(visits) + 1;
} else {
    visits = 1;
}
localStorage.setItem('deadrails_visits', visits);

var visitCounter = document.getElementById('visitCounter');
if (visitCounter) {
    visitCounter.textContent = 'Відвідування #' + visits;
}


var zombieEmojis = ['🧟', '💀', '☠️', '🩸', '🔪', '⚰️', '🪦', '👻'];

function addRandomZombie() {
    var zombie = document.createElement('div');
    zombie.style.position = 'fixed';
    zombie.style.fontSize = Math.random() * 30 + 20 + 'px';
    zombie.style.pointerEvents = 'none';
    zombie.style.zIndex = '1';
    zombie.style.opacity = '0.3';
    zombie.textContent = zombieEmojis[Math.floor(Math.random() * zombieEmojis.length)];

    var side = Math.floor(Math.random() * 2);
    if (side === 0) {
        zombie.style.left = '-50px';
        zombie.style.top = Math.random() * window.innerHeight + 'px';
        moveZombie(zombie, 'right');
    } else {
        zombie.style.right = '-50px';
        zombie.style.top = Math.random() * window.innerHeight + 'px';
        moveZombie(zombie, 'left');
    }

    document.body.appendChild(zombie);
}

function moveZombie(zombie, direction) {
    var posX = direction === 'right' ? -50 : window.innerWidth + 50;
    var speed = Math.random() * 2 + 0.5;

    function animate() {
        if (direction === 'right') {
            posX += speed;
        } else {
            posX -= speed;
        }
        zombie.style.left = posX + 'px';
        zombie.style.right = 'auto';
        zombie.style.transform = 'rotate(' + (Math.sin(posX * 0.05) * 15) + 'deg)';

        if (posX > -60 && posX < window.innerWidth + 60) {
            requestAnimationFrame(animate);
        } else {
            if (zombie.parentNode) {
                zombie.parentNode.removeChild(zombie);
            }
        }
    }

    requestAnimationFrame(animate);
}

setInterval(addRandomZombie, 5000);

document.addEventListener('DOMContentLoaded', function() {
   
    animateCounters();

  
    handleScrollAnimations();

    
    var cards = document.querySelectorAll('.weapon-card, .item-card, .class-card, .enemy-card, .location-card, .news-card, .tip-card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.animationDelay = (i * 0.08) + 's';
    }
});


console.log('%c🧟 DEAD RAILS WIKI 🧟', 'color: red; font-size: 30px; font-weight: bold; text-shadow: 2px 2px black;');
console.log('%cВітаємо на Dead Rails Wiki! Виживайте серед зомбі! 💀', 'color: #ff0000; font-size: 16px;');
console.log('%cВідвідування #' + visits, 'color: #00ff00; font-size: 14px;');
console.log('%c8 сторінок: Головна, Зброя, Предмети, Класи, Валюта, Вороги, Гайди, Карта', 'color: #ffcc00; font-size: 12px;');
