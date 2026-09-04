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

document.getElementById('polaroidStack').addEventListener('click', () => {
  currentProfile = (currentProfile + 1) % profiles.length;
  const profile = profiles[currentProfile];
  polaroidImg.src = profile.photo;
  whoAmIHeading.textContent = profile.heading;
  if (profile.paragraphs) {
    whoAmIPara1.innerHTML = profile.paragraphs[0];
    whoAmIPara2.innerHTML = profile.paragraphs[1];
  }
});
