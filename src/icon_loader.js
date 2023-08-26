import hamburger from "./icons/menu.svg";
import magnifyingGlass from "./icons/magnifying-glass.svg";
import upcomingImg from "./icons/fast-forward.svg";
import todayImg from "./icons/today.svg";
import calendarImg from "./icons/calendar.svg";
import plus from "./icons/plus.png";
import settignsImg from "./icons/setting-lines.svg";
import logoutImg from "./icons/logout.svg";

function loadImages() {
    const hamburgerImgNode = document.querySelector('.hamburger>img');
    hamburgerImgNode.src = hamburger;

    const searchBarImgNode = document.querySelector('.search-bar>img');
    searchBarImgNode.src = magnifyingGlass;

    const upcomingImgNode = document.querySelector('#upcoming>img');
    upcomingImgNode.src = upcomingImg;

    const todayImgNode = document.querySelector('#today>img');
    todayImgNode.src = todayImg;

    const calendarImgNode = document.querySelector('#calendar>img');
    calendarImgNode.src = calendarImg;

    const newListBtn = document.querySelector("#add-new-list>img");
    newListBtn.src = plus;

    const settignsImgNode = document.querySelector(".bottom img");
    settignsImgNode.src = settignsImg;

    const signOutImgNode = document.querySelector(".bottom>:last-child img");
    signOutImgNode.src = logoutImg;

    const newStickerBtn = document.querySelector('.circle img');
    newStickerBtn.src = plus;
}

export default loadImages;