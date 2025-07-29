export default function WordLetter({wordLetter}) {
    return (
        <div
            className="word"
            key={wordLetter.id}>
            {wordLetter.status ? wordLetter.value.toUpperCase() : ""}
        </div>
    )
}