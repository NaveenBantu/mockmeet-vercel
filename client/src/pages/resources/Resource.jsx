// import React from "react";
import { Accordion_list } from "./Accordion";

import { useParams } from "react-router-dom";

const frontendData = {
  HTML: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/html/default.asp",
    },
    {
      text: "programiz",
      link: "https://www.programiz.com/html",
    },
    {
      text: "MDN Docs",
      link: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
    },
    {
      text: "Tutorials Tonight",
      link: "https://www.tutorialstonight.com/html/html-introduction",
    },
  ],

  CSS: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/css/default.asp",
    },
    {
      text: "programiz",
      link: "https://www.programiz.com/css",
    },
    {
      text: "MDN Docs",
      link: "https://developer.mozilla.org/en-US/docs/Learn/css",
    },
    {
      text: "Tutorials Tonight",
      link: "https://www.tutorialstonight.com/css/css-introduction",
    },
  ],
  JavaScript: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/js/default.asp",
    },
    {
      text: "programiz",
      link: "https://www.programiz.com/javascript",
    },
    {
      text: "MDN Docs",
      link: "https://developer.mozilla.org/en-US/docs/Learn/javascript",
    },
    {
      text: "Tutorials Tonight",
      link: "https://www.tutorialstonight.com/js/javascript-tutorial",
    },
  ],
  React: [
    {
      text: "React.Dev",
      link: "https://react.dev/",
    },
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/REACT/DEFAULT.ASP",
    },
    {
      text: "Tutorials point",
      link: "https://www.tutorialspoint.com/reactjs/index.htm",
    },
    {
      text: "Geeks for geeks",
      link: "https://www.geeksforgeeks.org/reactjs-tutorials/",
    },
  ],
};

const fullStackData = {
  HTML: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/html/default.asp",
    },
    {
      text: "programiz",
      link: "https://www.programiz.com/html",
    },
    {
      text: "MDN Docs",
      link: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
    },
    {
      text: "Tutorials Tonight",
      link: "https://www.tutorialstonight.com/html/html-introduction",
    },
  ],

  CSS: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/css/default.asp",
    },
    {
      text: "programiz",
      link: "https://www.programiz.com/css",
    },
    {
      text: "MDN Docs",
      link: "https://developer.mozilla.org/en-US/docs/Learn/css",
    },
    {
      text: "Tutorials Tonight",
      link: "https://www.tutorialstonight.com/css/css-introduction",
    },
  ],
  JavaScript: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/js/default.asp",
    },
    {
      text: "programiz",
      link: "https://www.programiz.com/javascript",
    },
    {
      text: "MDN Docs",
      link: "https://developer.mozilla.org/en-US/docs/Learn/javascript",
    },
    {
      text: "Tutorials Tonight",
      link: "https://www.tutorialstonight.com/js/javascript-tutorial",
    },
  ],
  React: [
    {
      text: "React.Dev",
      link: "https://react.dev/",
    },
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/REACT/DEFAULT.ASP",
    },
    {
      text: "Tutorials point",
      link: "https://www.tutorialspoint.com/reactjs/index.htm",
    },
    {
      text: "Geeks for geeks",
      link: "https://www.geeksforgeeks.org/reactjs-tutorials/",
    },
  ],
  NodeJS: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/nodejs",
    },
    {
      text: "Node js Dev",
      link: "https://nodejs.dev/en/learn/",
    },
    {
      text: "Tutorials Point",
      link: "https://www.tutorialspoint.com/nodejs/index.htm",
    },
  ],
  Mongodb: [
    {
      text: "mongodb atlas",
      link: "https://www.mongodb.com/docs/atlas/",
    },
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/mongodb/",
    },
    {
      text: "MongoDB Tutorial",
      link: "https://www.mongodbtutorial.org/",
    },
  ],
  ExpressJs: [
    {
      text: "Express js",
      link: "https://expressjs.com/",
    },
    {
      text: "Tutorials Point",
      link: "https://www.tutorialspoint.com/expressjs/",
    },
    {
      text: "Mozilla",
      link: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction",
    },
  ],
  MongooseJs: [
    {
      text: "Mongoosejs",
      link: "https://mongoosejs.com/docs/",
    },
    {
      text: "geeks for geeks",
      link: "https://www.geeksforgeeks.org/mongoose-tutorial/",
    },
    {
      text: "Masteringjs",
      link: "https://masteringjs.io/mongoose",
    },
  ],

  git: [
    {
      text: "git and github freecodecamp article",
      link: "https://www.freecodecamp.org/news/the-beginners-guide-to-git-github/",
    },
    {
      text: "git",
      link: "https://www.freecodecamp.org/news/what-is-git-and-how-to-use-it-c341b049ae61/",
    },
  ],
};

const backendData = {
  NodeJS: [
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/nodejs",
    },
    {
      text: "Node js Dev",
      link: "https://nodejs.dev/en/learn/",
    },
    {
      text: "Tutorials Point",
      link: "https://www.tutorialspoint.com/nodejs/index.htm",
    },
  ],
  Mongodb: [
    {
      text: "mongodb atlas",
      link: "https://www.mongodb.com/docs/atlas/",
    },
    {
      text: "W3 schools",
      link: "https://www.w3schools.com/mongodb/",
    },
    {
      text: "MongoDB Tutorial",
      link: "https://www.mongodbtutorial.org/",
    },
  ],
  ExpressJs: [
    {
      text: "Express js",
      link: "https://expressjs.com/",
    },
    {
      text: "Tutorials Point",
      link: "https://www.tutorialspoint.com/expressjs/",
    },
    {
      text: "Mozilla",
      link: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction",
    },
  ],
  MongooseJs: [
    {
      text: "Mongoosejs",
      link: "https://mongoosejs.com/docs/",
    },
    {
      text: "geeks for geeks",
      link: "https://www.geeksforgeeks.org/mongoose-tutorial/",
    },
    {
      text: "Masteringjs",
      link: "https://masteringjs.io/mongoose",
    },
  ],
};

const softSkillsData = {
  TimeManagement: [
    {
      text: "Simplilearn",
      link: "https://www.simplilearn.com/time-management-skills-article",
    },
  ],
  ObservationalSkills: [
    {
      text: "indeed",
      link: "https://www.indeed.com/career-advice/career-development/improve-observation-skills",
    },
  ],
  AnalyticalSkills: [
    {
      text: "indeed",
      link: "https://in.indeed.com/career-advice/career-development/how-to-improve-analytical-skills",
    },
  ],
  CreativeSkills: [
    {
      text: "wagento",
      link: "https://www.wagento.com/wagento-way/tips-to-improve-creativity-in-web-designing-skills/",
    },
  ],
};

const dsaData = {
  dsa: [
    {
      text: "Programiz",
      link: "https://www.programiz.com/dsa",
    },
    {
      text: "GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/",
    },
    {
      text: "TutorialsPoint",
      link: "https://www.tutorialspoint.com/data_structures_algorithms/index.htm",
    },
    {
      text: "w3 schools",
      link: "https://www.w3schools.in/data-structures/intro",
    },
    {
      text: "freecodecamp(video)",
      link: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
    },
  ],
};
function Resource() {
  const { name } = useParams();
  let resource;
  if (name === "frontend") {
    return (resource = <Accordion_list data={frontendData} title="Frontend" />);
  }

  if (name === "backend") {
    return (resource = <Accordion_list data={backendData} title="Backend" />);
  }
  if (name === "full-stack") {
    return (resource = (
      <Accordion_list data={fullStackData} title="Full-Stack" />
    ));
  }
  if (name === "behavioral") {
    return (resource = (
      <Accordion_list data={softSkillsData} title="Soft-Skills" />
    ));
  }
  if (name === "dsa") {
    return (resource = <Accordion_list data={dsaData} title="Dsa" />);
  }
  return <>{resource}</>;
}

export default Resource;
