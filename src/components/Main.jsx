import {languagesList, wordsList} from "../data.js";
import {useState} from "react";
import {nanoid} from "nanoid";
import Header from "./Header.jsx";
import Status from "./Status.jsx";
import Lang from "./Lang.jsx";
import WordLetter from "./WordLetter.jsx";
import Letter from "./Letter.jsx";

export default function Main() {
    const [word, setWord] = useState(() => getWord());
    const [letters, setLetters] = useState(() => getLetters())
    const [langs, setLangs] = useState(() => languagesList);

    const isStarted = letters.some(letter => letter.status !== "")
    const isDone = langs.filter(lang => ! lang.status).length === 8 ||
        word.every(wordLetter => wordLetter.status)
    const won = word.every(wordLetter => wordLetter.status)
    const lost = langs.filter(lang => ! lang.status).length === 8 &&
        word.some(wordLetter => ! wordLetter.status)
    const anyDead = langs.some(lang => ! lang.status)

    function handleLetter(e, letter) {
        console.log(letter)
        console.log(word)

        const hit = word.some(wordLetter => wordLetter.value === letter.id)

        if (hit) {
            setWord(prevWord => prevWord.map((wordLetter) => {
                return wordLetter.value === letter.id ? { ...wordLetter, status: true } : wordLetter
            }))
        }
        else {
            const deadLang = langs.find(lang => lang.status)
            setLangs(prevLangs => prevLangs.map(lang => {
                return lang.id === deadLang.id ? { ...lang, status: false } : lang
            }))
        }

        setLetters(prevLetters => prevLetters.map(item => {
            return item.id === letter.id ? { ...item, status: hit ? "success" : "failed" } : item
        }))
    }

    function newGame() {
        setWord(getWord())
        setLetters(prevLetters => prevLetters.map(item => ({...item, status: ""})))
        setLangs(prevLangs => prevLangs.map(lang => ({ ...lang, status: true })))
    }

    function getWord() {
        return wordsList[Math.floor(Math.random() * wordsList.length)].split("").map((letter) => ({
            id: nanoid(),
            value: letter.toLowerCase(),
            status: false,
        }))
    }

    function getLetters() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => ({
            id: letter,
            name: letter.toUpperCase(),
            status: "",
        }))
    }

    return (
        <main>
            <Header />

            <Status
                isStarted={isStarted}
                isDone={isDone}
                won={won}
                lost={lost}
                anyDead={anyDead}
                langs={langs}
            />

            <div className="langs">
                {langs.map(lang => (
                    <Lang
                        key={lang.id}
                        lang={lang}
                    />
                ))}
            </div>

            <div className="words">
                {word.map(wordLetter => (
                    <WordLetter
                        key={wordLetter.id}
                        wordLetter={wordLetter}
                    />
                ))}
            </div>

            <div className="letters">
                {letters.map(letter => (
                    <Letter
                        key={letter.id}
                        letter={letter}
                        handleLetters={handleLetter}
                    />
                ))}
            </div>

            {isDone && (
                <button
                    className="new"
                    onClick={newGame}>
                    New Game
                </button>
            )}
        </main>
    )
}