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
    tags: 'UX Research &middot; Group Project &middot; Double Diamond',
    description: 'A UX-focused group project for BLÅ SOL Festival, where we designed a mobile app extension that helps festival-goers stay connected, coordinate with friends, and enjoy a more seamless social experience.',
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
    paragraphs: [
      "I'm <strong>Martina</strong>, a Multimedia Design student passionate about <strong>UX/UI and visual design</strong>. I've always known that I wanted my work to have a purpose: <strong>creating something meaningful and genuinely useful</strong>. Design allows me to do that while giving me the freedom to <strong>express my creativity</strong>.",
      "I think that the recipe for great design is more than just aesthetic, it's about <strong>creating solutions that are visually engaging while solving real problems in the easiest and most intuitive way possible</strong>. I love taking on new challenges, and finding the balance between beauty and functionality is what makes me the most excited in the design process."
    ]
  },
  {
    photo: 'assets/polaroid2.png',
    paragraphs: [
      "I moved to <strong>Aarhus in August 2025</strong> after graduating from high school. I had never been here before and I didn't know anyone, but I was looking for a challenge that would push me outside my comfort zone, and it definitely did.",
      "Moving alone to a new country has taught me how to <strong>adapt quickly to unfamiliar situations and become truly independent</strong>. It has been one of the most rewarding decisions I've ever made, both personally and professionally. I'm even considering staying in Denmark after finishing my studies. In the meantime, though, I should probably improve my Danish."
    ]
  },
  {
    photo: 'assets/polaroid3.png',
    paragraphs: [
      "<strong>Traveling has always been a huge part of who I am</strong>. One of my recent goals was to visit 20 countries before turning 20, a milestone I've just achieved and am incredibly grateful for.",
      "For me, there's no greater source of inspiration than stepping into a place that feels completely different from what I'm used to. <strong>I'm naturally curious, and discovering new landscapes, trying local food, and connecting with people from different cultures is what excites me most</strong>. Every journey teaches me something new and reminds me how much there is to explore, which is exactly what keeps me looking forward to the next adventure."
    ]
  },
  {
    photo: 'assets/polaroid4.png',
    paragraphs: [
      "I was born in a <strong>small town in the Italian Alps</strong>, and although I grew up in a city just outside Milan, my heart has always belonged in the mountains. Spending every summer there as a child deepened my <strong>connection with nature</strong>, and it remains one of my greatest sources of inspiration.",
      "Whenever I need a break, you'll probably find me somewhere above 1,200 meters, with no phone signal and nothing but nature around me. That's where I feel truly myself, and where I come back with a clear mind and fresh ideas."
    ]
  },
  {
    photo: 'assets/polaroid5.png',
    paragraphs: [
      "<strong>Art</strong> has been a passion of mine since middle school, thanks to an inspiring, though undeniably strict, art teacher who sparked my appreciation for it. Her fervor was contagious, and it completely changed the way I looked at creativity.",
      "What fascinates me most is that, throughout history, people have always felt the need to create art simply to express themselves, without any practical purpose. <strong>Seeing how artistic techniques and ideas have evolved over time has taught me that creativity is a reflection of culture, emotion, and human nature altogether</strong>, something that continues to inspire the way I approach design today."
    ]
  }
];

let currentProfile = 0;
const polaroidImg = document.getElementById('polaroidImg');
const whoAmIPara1 = document.getElementById('whoAmIPara1');
const whoAmIPara2 = document.getElementById('whoAmIPara2');

document.getElementById('polaroidStack').addEventListener('click', () => {
  currentProfile = (currentProfile + 1) % profiles.length;
  const profile = profiles[currentProfile];
  polaroidImg.src = profile.photo;
  if (profile.paragraphs) {
    whoAmIPara1.innerHTML = profile.paragraphs[0];
    whoAmIPara2.innerHTML = profile.paragraphs[1];
  }
});
