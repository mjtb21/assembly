
export default function Status(props) {
    return (
        <div className="status">
            <div className={"status-box status-started " + (
                    props.isStarted && ! props.isDone && props.anyDead ? "show" : ""
                )}>
                <span>“Farewell {
                    props.langs.filter(lang => ! lang.status).map(lang => lang.name).join(" & ")
                }” 🫡</span>
            </div>

            <div className={"status-box status-win " + (props.isDone && props.won ? "show" : "")}>
                <span className="status-title">You win!</span>
                <span>Well done! 🎉</span>
            </div>

            <div className={"status-box status-lose " + (props.isDone && props.lost ? "show" : "")}>
                <span className="status-title">Game over!</span>
                <span>You lose! Better start learning Assembly 😭</span>
            </div>
        </div>
    )
}