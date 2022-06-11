$(document).ready(function () {
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });

    $(".zoom").hover(function () {

        $(this).addClass('transition');
    }, function () {

        $(this).removeClass('transition');
    });

    var typed = new Typed('.typedelem', {
        strings: ["", "Do you want to work with me ?"],
        typeSpeed: 60,
        // showCursor: false,
        loop: true,
        backDelay: 900,
        backSpeed: 40,
    });

    let arr1 = ["Musician", "Graphic Designer", "Software Engineer", "Web Developer"];
    setInterval(() => {
        $(".typed2").html(arr1[0 | Math.random() * arr1.length])
    }, 2000);
});

const githubColors = {
    "ActionScript": "#882B0F",
    "Ada": "#02f88c",
    "ANTLR": "#9DC3FF",
    "Arduino": "#bd79d1",
    "ASP": "#6a40fd",
    "Assembly": "#6E4C13",
    "Brainfuck": "#2F2530",
    "C Sharp": "#178600",
    "C": "#555555",
    "Clojure": "#db5855",
    "CoffeeScript": "#244776",
    "ColdFusion CFC": "#ed2cd6",
    "ColdFusion": "#ed2cd6",
    "cpp": "#f34b7d",
    "CSS": "#563d7c",
    "D": "#ba595e",
    "Dart": "#00B4AB",
    "Diff": "#88dddd",
    "Elixir": "#6e4a7e",
    "Elm": "#60B5CC",
    "Emacs Lisp": "#c065db",
    "EmberScript": "#FFF4F3",
    "Erlang": "#B83998",
    "F#": "#b845fc",
    "FORTRAN": "#4d41b1",
    "Game Maker Language": "#8fb200",
    "Glyph": "#e4cc98",
    "Go": "#375eab",
    "Handlebars": "#01a9d6",
    "Haskell": "#29b544",
    "Haxe": "#df7900",
    "Java": "#b07219",
    "JavaScript": "#f1e05a",
    "Jupyter Notebook": "#DA5B0B",
    "Kotlin": "#F18E33",
    "LiveScript": "#499886",
    "Lua": "#000080",
    "Makefile": "#427819",
    "Matlab": "#bb92ac",
    "Objective-C": "#438eff",
    "Objective-C++": "#6866fb",
    "Objective-J": "#ff0c5a",
    "OCaml": "#3be133",
    "PAWN": "#dbb284",
    "Perl": "#0298c3",
    "Perl6": "#0000fb",
    "PHP": "#4F5D95",
    "PLSQL": "#dad8d8",
    "Prolog": "#74283c",
    "Propeller Spin": "#7fa2a7",
    "Python": "#3572A5",
    "QML": "#44a51c",
    "R": "#198ce7",
    "Ruby": "#701516",
    "Rust": "#dea584",
    "Shell": "#89e051",
    "SourcePawn": "#5c7611",
    "Swift": "#ffac45",
    "TypeScript": "#2b7489",
    "Unified Parallel C": "#4e3617",
    "Unity3D Asset": "#ab69a1",
    "UnrealScript": "#a54c4d",
    "VHDL": "#adb2cb",
    "VimL": "#199f4b",
    "Visual Basic": "#945db7",
    "Vue": "#2c3e50",
    "XQuery": "#5232e7",
    "Zephir": "#118f9e",
};


let cards = document.getElementsByClassName("github-cards")[0];

function createCard(obj) {
    cards.innerHTML += `<a href="${obj.link}" class="github-card" data-github="${obj.repo}">
        <h3>${obj.name}</h3>
        <p>${obj.describe}</p>
        <span class="github-card__meta">
            <span class="github-card__language-icon" style="color: ${obj.color};">●</span> ${obj.language}
        </span>
        <span class="github-card__meta">
            <i class="fa fa-star" aria-hidden="true"></i>
            <span data-stars>
                <i class="fa fa-spinner" aria-hidden="true"></i>
            </span>
        </span>
        <span class="github-card__meta">
            <i class="fa fa-code-fork" aria-hidden="true"></i>
            <span data-forks>
                <i class="fa fa-spinner" aria-hidden="true"></i>
            </span>
        </span>
    </a>`;
}

createCard({
    link: "https://github.com/hun756/string",
    repo: "hun756/String",
    name: "String",
    describe: "C++ string library using C++11 smart pointer library.",
    language: "C++",
    color: githubColors["cpp"]
});

createCard({
    link: "https://github.com/hun756/CQuery",
    repo: "hun756/CQuery",
    name: "Cquery",
    describe: "The jquery library has been rewritten in c++/cheerp.",
    language: "C++",
    color: githubColors["cpp"]
});

createCard({
    link: "https://github.com/hun756/SmallVector",
    repo: "hun756/SmallVector",
    name: "Small Vector",
    describe: "Small vector implementation using C ~50 lines.",
    language: "C",
    color: githubColors["C"]
});

createCard({
    link: "https://github.com/hun756/Javascript-Notes",
    repo: "hun756/Javascript-Notes",
    name: "Javascript-Notes",
    describe: "Code snippets maintained for javascript programming.",
    language: "JavaScript",
    color: githubColors["JavaScript"]
});

createCard({
    link: "https://github.com/hun756/Uri",
    repo: "hun756/Uri",
    name: "Uri",
    describe: "Uri parser library written in C++",
    language: "C++",
    color: githubColors["cpp"]
});

createCard({
    link: "https://github.com/hun756/leetcode",
    repo: "hun756/leetcode",
    name: "leetcode",
    describe: "My leetcode problem solutions..!",
    language: "C++",
    color: githubColors["cpp"]
});

document.querySelectorAll('[data-github]').forEach(elem => {
    const repo = elem.getAttribute('data-github');
    fetch("https://api.github.com/repos/" + repo).then((response) => {
        return response.json();
    }).then((response => {
        !!(elem.querySelector("[data-forks]").textContent = response.forks);
        !!(elem.querySelector("[data-stars]").textContent = response.stargazers_count);
    }))
});