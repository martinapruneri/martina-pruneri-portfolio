const projects = [
  {
    mockupType: 'laptop',
    images: [
      { src: 'assets/hiddenwallspc.png', alt: 'Hidden Walls website preview shown on a laptop screen' }
    ],
    title: 'Hidden Walls Website',
    tags: 'UI design &middot; Responsive web design',
    description: "A responsive web experience that showcases three hidden street art locations in Aarhus. The project combines user research, UX design, and front-end development to create an engaging platform that inspires people to discover and explore the city's urban art.",
    link: 'hiddenwalls.html'
  },
  {
    mockupType: 'phones',
    images: [
      { src: 'assets/blaasolmap.png', alt: 'Blå Sol festival app map screen showing group member locations' },
      { src: 'assets/blaasolgroup.png', alt: 'Blå Sol festival app group screen for the Bass & Besties group' }
    ],
    title: 'Blaa Sol Festival App',
    tags: 'UX Research &middot; UX/UI Design &middot; Double Diamond &middot; Group Project',
    description: 'A UX-focused group project for BLÅ SOL Festival, where we designed an extension to the existing mobile app to help festival-goers stay connected, coordinate with friends, and enjoy a more seamless social experience.',
    link: 'blaasol.html'
  }
];

let currentProject = 0;

const projectMockup = document.getElementById('projectMockup');
const projectTitle = document.getElementById('projectTitle');
const projectTags = document.getElementById('projectTags');
const projectDesc = document.getElementById('projectDesc');
const projectLink = document.getElementById('projectLink');

function renderProject(index) {
  const project = projects[index];
  projectMockup.innerHTML = '';
  project.images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    projectMockup.appendChild(img);
  });
  projectTitle.textContent = project.title;
  projectTags.innerHTML = project.tags;
  projectDesc.textContent = project.description;
  projectLink.href = project.link;
}

document.getElementById('prevProject').addEventListener('click', () => {
  currentProject = (currentProject - 1 + projects.length) % projects.length;
  renderProject(currentProject);
});

document.getElementById('nextProject').addEventListener('click', () => {
  currentProject = (currentProject + 1) % projects.length;
  renderProject(currentProject);
});

// Keep the existing arrow carousel and provide native scrolling on phones.
const carousel = document.querySelector('.carousel');
const mobileTrack = document.createElement('div');
mobileTrack.className = 'carousel__mobile-track';
mobileTrack.id = 'mobileProjects';
mobileTrack.setAttribute('role', 'region');
mobileTrack.setAttribute('aria-label', 'Projects');
mobileTrack.tabIndex = 0;
const mobileDots = document.createElement('div');
mobileDots.className = 'carousel__dots';
mobileDots.setAttribute('role', 'group');
mobileDots.setAttribute('aria-label', 'Choose a project');

projects.forEach((project, index) => {
  const slide = carousel.querySelector('.carousel__slide').cloneNode(true);
  slide.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-label', `${index + 1} of ${projects.length}: ${project.title}`);
  if (index > 0) {
    const mockup = slide.querySelector('.carousel__mockup-inner');
    mockup.replaceChildren(...project.images.map(image => {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      return img;
    }));
    slide.querySelector('h3').textContent = project.title;
    slide.querySelector('.carousel__tags').innerHTML = project.tags;
    slide.querySelector('.carousel__desc').textContent = project.description;
    slide.querySelector('.btn-img').href = project.link;
  }
  mobileTrack.appendChild(slide);

  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show ${project.title}`);
  dot.setAttribute('aria-controls', mobileTrack.id);
  dot.setAttribute('aria-current', String(index === 0));
  dot.addEventListener('click', () => {
    mobileTrack.scrollTo({
      left: (index + 1) * mobileTrack.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  });
  mobileDots.appendChild(dot);
});

const firstSlideCopy = mobileTrack.firstElementChild.cloneNode(true);
const lastSlideCopy = mobileTrack.lastElementChild.cloneNode(true);
mobileTrack.prepend(lastSlideCopy);
mobileTrack.append(firstSlideCopy);

let mobileProjectIndex = 0;
let scrollSettledTimer;
let isTouchingCarousel = false;

function settleMobileCarousel() {
  if (isTouchingCarousel || !mobileTrack.clientWidth) return;
  const position = Math.round(mobileTrack.scrollLeft / mobileTrack.clientWidth);
  if (position === 0 || position === projects.length + 1) {
    mobileTrack.scrollTo({
      left: (mobileProjectIndex + 1) * mobileTrack.clientWidth,
      behavior: 'instant'
    });
  }
}

mobileTrack.addEventListener('touchstart', () => {
  isTouchingCarousel = true;
}, { passive: true });
function endCarouselTouch() {
  isTouchingCarousel = false;
  clearTimeout(scrollSettledTimer);
  scrollSettledTimer = setTimeout(settleMobileCarousel, 150);
}
mobileTrack.addEventListener('touchend', endCarouselTouch, { passive: true });
mobileTrack.addEventListener('touchcancel', endCarouselTouch, { passive: true });
mobileTrack.addEventListener('scrollend', settleMobileCarousel);
mobileTrack.addEventListener('scroll', () => {
  if (!mobileTrack.clientWidth) return;
  const position = Math.round(mobileTrack.scrollLeft / mobileTrack.clientWidth);
  mobileProjectIndex = (position - 1 + projects.length) % projects.length;
  [...mobileDots.children].forEach((dot, dotIndex) => {
    dot.setAttribute('aria-current', String(dotIndex === mobileProjectIndex));
  });
  clearTimeout(scrollSettledTimer);
  scrollSettledTimer = setTimeout(settleMobileCarousel, 150);
}, { passive: true });
carousel.append(mobileTrack, mobileDots);
new ResizeObserver(() => {
  if (mobileTrack.clientWidth) {
    mobileTrack.scrollTo({
      left: (mobileProjectIndex + 1) * mobileTrack.clientWidth,
      behavior: 'instant'
    });
  }
}).observe(mobileTrack);

const profiles = [
  {
    photo: 'assets/polaroid1.png',
    heading: 'Who am I?',
    paragraphs: [
      "Hi, I'm <strong>Martina</strong>, an enthusiastic Multimedia Design student keen on <strong>UX/UI and visual design</strong>. Through my work I want to <strong>create something meaningful and genuinely useful</strong>, and being a designer allows me to do that while giving me the freedom to express my creativity.",
      "I think that the recipe for good design involves more than just looks, it's about <strong>creating visually engaging solutions that solve real problems in the simplest and most intuitive way possible</strong>. I love taking on new challenges, and finding the balance between beauty and functionality is what drives me."
    ]
  },
  {
    photo: 'assets/polaroid2.png',
    heading: 'Where am I now?',
    paragraphs: [
      "Born and raised in Italy, I moved to <strong>Aarhus in August 2025</strong> after graduating from high school. I was looking for something to push me out of my comfort zone, and moving to a new city where I didn't know anyone was just what I needed.",
      "Coming alone to Denmark has taught me how to <strong>adapt quickly in unfamiliar situations and to become truly independent</strong>. It has been a great journey so far, both personally and professionally. I'm even considering staying here long-term. In the meantime, though, I should probably improve my Danish."
    ]
  },
  {
    photo: 'assets/polaroid4.png',
    heading: 'Where am I from?',
    paragraphs: [
      "I was born in a <strong>village on the Italian Alps</strong> close to Switzerland, and although I grew up in a bigger city near Milan, the mountains have always been the place where I feel the most in my element.",
      "Spending my summers there as a child deepened my <strong>love for nature</strong>, and even to this day, whenever I need a break you'll probably find me somewhere above 1200 meters."
    ]
  },
  {
    photo: 'assets/polaroid3.png',
    heading: 'What do I like?',
    paragraphs: [
      "<strong>My biggest passion has always been traveling</strong>. One of my most recent goals was to visit 20 countries before turning 20, a milestone which I just achieved and am really grateful for.",
      "Every trip has taught me something new, and <strong>exploring unknown places while meeting amazing people from diverse backgrounds is what excites me the most</strong>. This doesn't only benefit me in my private life, but also as a designer, giving me new ideas and points of view."
    ]
  },
  {
    photo: 'assets/polaroid5.png',
    heading: 'What do I like?',
    paragraphs: [
      "When I was in middle school, my teacher once said that <strong>all art is quite useless</strong>, at the time I didn't know that she wasn't the first one to say that, but that's how my interest in visual arts sparked.",
      "Throughout my studies, seeing how artistic techniques and ideas have evolved over time has taught me how <strong>creativity is a reflection of human nature</strong>, something that continues to inspire the way I approach design today."
    ]
  }
];

let currentProfile = 0;
const polaroidImg = document.getElementById('polaroidImg');
const whoAmIHeading = document.getElementById('whoAmIHeading');
const whoAmIPara1 = document.getElementById('whoAmIPara1');
const whoAmIPara2 = document.getElementById('whoAmIPara2');

const polaroidStack = document.getElementById('polaroidStack');
const profileSection = document.querySelector('.who-am-i');
const profileDots = document.createElement('div');
profileDots.className = 'profile-dots';
profileDots.setAttribute('role', 'group');
profileDots.setAttribute('aria-label', 'Choose a photo');
profiles.forEach((profile, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show photo ${index + 1}: ${profile.heading}`);
  dot.setAttribute('aria-current', String(index === 0));
  dot.addEventListener('click', event => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      scrollToProfile(index + 1);
    } else {
      changeProfile(index - currentProfile);
    }
  });
  profileDots.appendChild(dot);
});
profileSection.appendChild(profileDots);

function changeProfile(direction) {
  currentProfile = (currentProfile + direction + profiles.length) % profiles.length;
  const profile = profiles[currentProfile];
  polaroidImg.src = profile.photo;
  [...profileDots.children].forEach((dot, index) => {
    dot.setAttribute('aria-current', String(index === currentProfile));
  });
  whoAmIHeading.textContent = profile.heading;
  if (profile.paragraphs) {
    whoAmIPara1.innerHTML = profile.paragraphs[0];
    whoAmIPara2.innerHTML = profile.paragraphs[1];
  }
}

polaroidStack.addEventListener('click', () => changeProfile(1));

// Use the same native scrolling and looping as the mobile project carousel.
const profileTrack = document.createElement('div');
profileTrack.className = 'profile-mobile-track';
profileTrack.id = 'mobileProfiles';
profileTrack.setAttribute('role', 'region');
profileTrack.setAttribute('aria-label', 'About Martina');
profileTrack.tabIndex = 0;
profiles.forEach((profile, index) => {
  const slide = document.createElement('div');
  slide.className = 'profile-mobile-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-label', `${index + 1} of ${profiles.length}: ${profile.heading}`);
  const text = profileSection.querySelector('.who-am-i__text').cloneNode(true);
  text.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  if (index > 0) {
    text.querySelector('h2').textContent = profile.heading;
    text.querySelectorAll('p').forEach((paragraph, i) => {
      paragraph.innerHTML = profile.paragraphs[i];
    });
  }
  const photo = polaroidStack.cloneNode(true);
  photo.removeAttribute('id');
  photo.querySelector('img').removeAttribute('id');
  photo.querySelector('img').src = profile.photo;
  slide.append(text, photo);
  profileTrack.appendChild(slide);
});
profileTrack.prepend(profileTrack.lastElementChild.cloneNode(true));
profileTrack.append(profileTrack.children[1].cloneNode(true));
profileSection.insertBefore(profileTrack, profileDots);
[...profileDots.children].forEach(dot => dot.setAttribute('aria-controls', profileTrack.id));

let mobileProfileIndex = 0;
let profileScrollTimer;
let isTouchingProfile = false;
function scrollToProfile(position, behavior = 'smooth') {
  profileTrack.scrollTo({
    left: position * profileTrack.clientWidth,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : behavior
  });
}
function settleProfileCarousel() {
  if (isTouchingProfile || !profileTrack.clientWidth) return;
  const position = Math.round(profileTrack.scrollLeft / profileTrack.clientWidth);
  if (position === 0 || position === profiles.length + 1) {
    scrollToProfile(mobileProfileIndex + 1, 'instant');
  }
}
profileTrack.addEventListener('click', event => {
  if (event.target.closest('.polaroid-stack')) {
    scrollToProfile(mobileProfileIndex + 2);
  }
});
profileTrack.addEventListener('touchstart', () => {
  isTouchingProfile = true;
}, { passive: true });
function endProfileTouch() {
  isTouchingProfile = false;
  clearTimeout(profileScrollTimer);
  profileScrollTimer = setTimeout(settleProfileCarousel, 150);
}
profileTrack.addEventListener('touchend', endProfileTouch, { passive: true });
profileTrack.addEventListener('touchcancel', endProfileTouch, { passive: true });
profileTrack.addEventListener('scrollend', settleProfileCarousel);
profileTrack.addEventListener('scroll', () => {
  if (!profileTrack.clientWidth) return;
  const position = Math.round(profileTrack.scrollLeft / profileTrack.clientWidth);
  mobileProfileIndex = (position - 1 + profiles.length) % profiles.length;
  [...profileDots.children].forEach((dot, index) => {
    dot.setAttribute('aria-current', String(index === mobileProfileIndex));
  });
  clearTimeout(profileScrollTimer);
  profileScrollTimer = setTimeout(settleProfileCarousel, 150);
}, { passive: true });
new ResizeObserver(() => {
  if (profileTrack.clientWidth) scrollToProfile(mobileProfileIndex + 1, 'instant');
}).observe(profileTrack);
