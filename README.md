<hr>

 [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![GitHub commit activity](https://img.shields.io/github/commit-activity/y/LapseMP/lapse-grp3-2023.svg?style=for-the-badge)](https://github.com/LapseMP/lapse-grp3-2023/commits/main)

[![Angular][Angular]][Angular-url]
[![Ionic][Ionic]][Ionic-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Nestjs][Nestjs]][Nestjs-url]
[![NGXS][NGXS]][NGXS-url]
[![Nrwl][Nrwl]][Nrwl-url]
[![Cypress][Cypress]][Cypress-url]
[![Jest][Jest]][Jest-url]
[![Firebase][Firebase]][Firebase-url]
<hr>

<br />
<div align="center">
  <a href="https://github.com/LapseMP/lapse-grp3-2023">
    <img src="https://user-images.githubusercontent.com/105363824/235449091-d6d1591b-9ca6-4a75-ab1e-84811a340851.png">

  </a>

  <h3 align="center">    Invest your time wisely - connect meaningfully</h3>
  COS 301 Mini Project 2023
  <p align="center">
    <br />
    <a href="https://github.com/LapseMP/lapse-grp3-2023/wiki/4.-Documentation"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/orgs/LapseMP/projects/2">Our Project Board</a>
    ·
    <a href="https://github.com/LapseMP/lapse-grp3-2023/wiki/3.-Contracts">Contracts</a>
  </p>
</div>
<hr>


https://user-images.githubusercontent.com/105363824/235452476-59c765bc-ce40-40ab-aeb8-542083be717c.mp4






Lapse is a unique social media platform that uses time as a currency to foster meaningful interactions between users. By creating a time-based economy, the platform aims to encourage users to engage with quality content and discourage mindless scrolling and poor content. Lapse will offer an engaging and user-friendly environment for users to connect, share, and invest in content.

Users can spend time engaging with content, and in return, they earn time by creating meaningful or engaging content. The platform also allows users to invest in the content they see potential in, further encouraging content creators.

To learn more about this project see our [Lapse Mini Project Wiki](https://github.com/LapseMP/lapse-grp3-2023/wiki/1.-Lapse-Mini-Project), view our documentation [here](https://github.com/LapseMP/lapse-grp3-2023/wiki/4.-Documentation) 


## 📲Features
This social media app includes the following features:

- <b>Posting Posts:</b> Users can create and post content on the platform, which can be viewed by other users.
- <b>Buying Posts:</b> Users can use their time currency to purchase posts created by other users.
- <b>Viewing Profile:</b> Users can view their own profile which displays all the posts they have created
- <b>Viewing Portfolio:</b> Users can view their portfolios which displays all the posts they have bought.
- <b>Searching by User or Hashtag:</b> Users can search for other users's posts by username or search for posts by hashtag


## 👀See it in action!

https://user-images.githubusercontent.com/105363824/235509948-a36dd112-e0d3-4a12-92f9-f7eae11b120d.mp4



## 💻Requirements

The following items are required to run this project:

- Node 16: Used for the app, api and cli (Tip: use NVM)
- Java: used by the Firebase emulators (Make sure that JAVA_HOME is set. Tip: use JENV)
- You need to create a firebase project (See: https://console.firebase.google.com - You will need to config for your firebase project in the .env files, .firestorerc)
- Firebase CLI (See: https://firebase.google.com/docs/cli)

## ✅Get Started

1. Fork the repo

Go to: https://github.com/LapseMP/lapse-grp3-2023/fork

2. Clone your fork

```sh
git clone git@github.com:<ACCOUNT>/<PROJECT NAME>.git <PROJECT LOCAL NAME>
```

3. Install dependencies

```sh
cd path/to/project
yarn
```

4. Add Firebase configurations

See files:

- .firebaserc
- .env
- .env.pod

and find and replace "<REPLACE_ME>"

5. Run the stack:

Run these commands in separate terminals:

```sh
yarn start:api:dev
yarn start:emulators
yarn start:app:dev
```

6. CLI:

If you want to run the cli for admin, scripts, migrations etc.

```sh
yarn build:cli:prod
GOOGLE_APPLICATION_CREDENTIALS=.keys/<REPLACE ME WITH SERVICE ACCOUNT KEY.json> FIRESTORE_EMULATOR_HOST=localhost:5003 node dist/apps/cli/main.js <REPLACE ME WITH COMMAND>
```

## 🔥Emulators:

Once the emulators are up, please go to http://localhost:5001 to see the Emulator UI

## 🗒Notes:

- All contracts/interfaces can be viewed [here](https://github.com/LapseMP/lapse-grp3-2023/wiki/3.-Contracts) and [here](https://github.com/LapseMP/lapse-grp3-2023/wiki/2.-Suggested-format-for-API-(States-and-Client-API))
- When creating your Firebase authentication, hosting, storage, functions. Make sure to use the same location throughout. (MAKE SURE TO SET "Default GCP resource location" in Project Settings in Firebase Console. If you do not do this, the app will not work)
- The app is built to be a PWA. (See: So if you deploy it to prod, you can install the app on iOS by adding to home screen or using Android by installing through Chrome)

## 👥Our Team

### Project Manager

<table style="border:0px;">
  <tr style="border: 0px;">
    <td style="vertical-align: top; width: 30%; border:0px;">
      <img src="https://user-images.githubusercontent.com/105363824/235456246-0b061b57-c797-4073-a4c8-051349d9facd.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%; border:0px;">
            <b>Inge Odendaal</b><br>
      I am a bit of a data nerd and love the point where statistics and computer science meets. I enjoy working with other people and integrating ideas to get        unimagined results.
      <br>
      <a href="https://github.com/Inge505">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
</table>

### Business Analyst

<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235459776-1a225bed-b674-4666-86cb-dce066c43f63.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Daniel Bezuidenhout</b><br>
I'm currently in my 3rd year of undergraduate studies at the University of Pretoria, majoring in Computer Science. My main interests lie in Full Stack Development, Design and Databases. I love exploring the interplay between these fields and pushing the boundaries of what is possible.
      <br>
      <a href="https://github.com/Daniel-Bezuidenhout">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
</table>

### Designer

<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235459896-cb553c9b-a2d6-4868-a540-79ca80a0f40c.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Christiaan Lombard</b><br>
      I have a passion for people, design, software and how their amalgamation can make something unique and creative. My main interests are AI, machine learning and data science.
      <br>
      <a href="https://github.com/chrislom12">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>
      <a href="https://www.linkedin.com/in/christiaan-lombard-9a627a1a4/">
  <img src="https://img.icons8.com/fluency/24/000000/linkedin.png"/>
</a>

      
  </tr>
</table>

### UI Engineers


<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460111-85c5c566-4b0b-42e4-b633-f77ad45d1ed3.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Ronin Brookes</b><br>
     I'm a final year Computer Science Student. My main interests are software modeling, user interface and web design.
      <br>
      <a href="https://github.com/RoninBrookesTuks">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460117-81fda8ca-c29f-4433-a115-9b5c8bb50944.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Julian Pienaar</b><br>
I am a third year computer science student with an interest in visual design. Although I have had success in creating backends, I find it more engaging to work on something that is visual. This project has been a great learning experience and even helped me to understand where my passions lie.      <br>
      <a href="https://github.com/JulianPienaar">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
</table>

### Integration Engineers


<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460237-31bd63b7-43db-4ec5-8a3b-57de16cc5afa.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Paul Pilane</b><br>
I am a Final-Year Computer Science student, that aims to solve a class of problems throught the lenses of technological innovations.      <br>
      <a href="https://github.com/PaulPilane">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460247-f359d957-79e9-403f-aaae-967fc44c5ded.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Priyul Mahabeer</b><br>
    Passionate about space exploration, quantum computing, and AI, I'm an aspiring software engineer inspired by great minds in the field. Skilled in languages like C++, Java, and Python, I'm eager to push boundaries and innovate for a better future.
      <br>
      <a href="https://github.com/Priyul">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>
      <a href="https://www.linkedin.com/in/priyul-mahabeer/">
  <img src="https://img.icons8.com/fluency/24/000000/linkedin.png"/>
</a>


      
  </tr>
    <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460251-e0e76725-c3af-4543-9daa-e1221c6f1c85.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Lesedi Mokonyama</b><br>I'm a final year BSc Information and Knowledge Systems student who has a knack for web development (more specifically backend development). Learning new technologies and dipping my feet in other aspects of programming is what keeps me going!
      <br>
      <a href="https://github.com/LesediMoko">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
</table>

### Service Engineers


<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460437-5d4c1acf-1874-4b46-b83e-506d0526a457.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Mark Botros</b><br>
I am a third year Computer Science Student with a passion for Security, Data Science and APIs (some might know me as the API guy...)      <br>
      <a href="https://github.com/Mark-Botros">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460447-04444139-b144-405c-9872-10660aaed8c9.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Triumph Ndlovu</b><br>
    I'm a computer science student with a passion for problem-solving through elegant and efficient code. I'm excited to be part of the next generation of programmers who are pushing the boundaries of what's possible.
      <br>
      <a href="https://github.com/TriumphNdlovu">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>
      <a href="https://www.linkedin.com/in/triumph-ndlovu-425b73274/">
  <img src="https://img.icons8.com/fluency/24/000000/linkedin.png"/>

      
  </tr>
</table>


### Data Engineers

<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460556-03660855-5274-4b0b-a2b4-4af2184f6775.png" width="170" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Chris Mittendorf</b><br>
     I am a BSc Computer Science student who found my passion for coding and programming while finishing my first degree in BSc Geography. I worked on databases, data management and data normalisation.
      <br>
      <a href="https://github.com/ChrisMitt">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
</table>

### Tester

<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460641-417ef328-954d-416c-9354-7fd87e43f169.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Janco Spies</b><br>
      I am a software developer with a passion for systems that work like clockwork. I specialize in data science and backend oriented systems and enjoyed working with this talented team!
      <br>
      <a href="https://github.com/JanSpies82">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>
      <a href="https://www.linkedin.com/in/janco-spies-09787b1aa/">
  <img src="https://img.icons8.com/fluency/24/000000/linkedin.png"/>
</a>


      
  </tr>
</table>

### DevOps

<table style="border: none;">
  <tr>
    <td style="vertical-align: top; width: 30%;">
      <img src="https://user-images.githubusercontent.com/105363824/235460843-d1441f6d-2ea2-407d-873f-132325438748.png" width="150" height="auto">
    </td>
    <td style="vertical-align: top; width: 70%;">
            <b>Stefan van der Merwe</b><br>
      I am a 3rd year computer science student who loves hiking. I love playing around with hardware, this includes everything from building my own computer to embedded devices like the ESP32-series chips. It was a great pleasure and experience working with this team!                                                                                                                                                                                           
      <br>
      <a href="https://github.com/Stefan-vdm">
        <img src="https://img.icons8.com/material-rounded/24/000000/github.png" width="30" height="30"/>
      </a>

      
  </tr>
</table>





[contributors-shield]: https://img.shields.io/github/contributors/LapseMP/lapse-grp3-2023.svg?style=for-the-badge
[contributors-url]: https://github.com/LapseMP/lapse-grp3-2023/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LapseMP/lapse-grp3-2023.svg?style=for-the-badge
[forks-url]: https://github.com/LapseMP/lapse-grp3-2023/network/members
[stars-shield]: https://img.shields.io/github/stars/LapseMP/lapse-grp3-2023.svg?style=for-the-badge
[stars-url]: https://github.com/LapseMP/lapse-grp3-2023.svg/stargazers
[issues-shield]: https://img.shields.io/github/issues/LapseMP/lapse-grp3-2023.svg?style=for-the-badge
[issues-url]: https://github.com/LapseMP/lapse-grp3-2023.svg/issues

[Ionic]: https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white
[Ionic-url]: https://ionicframework.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[Angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Cypress]: https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white
[Cypress-url]: https://www.cypress.io/
[Jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Nestjs]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Nestjs-url]: https://nestjs.com/
[NGXS]: https://img.shields.io/badge/NGXS-EE5D36?style=for-the-badge&logo=angular&logoColor=white
[NGXS-url]: https://www.ngxs.io/
[Nrwl]: https://img.shields.io/badge/NRWL-00B9F1?style=for-the-badge&logo=nrwl&logoColor=white
[Nrwl-url]: https://nx.dev/
