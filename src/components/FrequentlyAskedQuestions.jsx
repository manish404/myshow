import { useRef, useState } from "react";

function FAQCard({ question }) {
    const ansRef = useRef(null);
    const [display, setDisplay] = useState('hidden');
    return (
        <li className="faq col">
            <span className="text-xl font-semibold">{question}</span>
            <span ref={ansRef} className={`ans ${display}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos ad dolorem beatae adipisci atque quis delectus placeat cumque eius! Deserunt aliquid accusantium delectus est aspernatur cumque facere magni. Voluptatibus.
            </span>
            <span className="toggler" onClick={() => {
                setDisplay(state => state === 'block' ? 'hidden' : 'block');
            }}><i className="bi bi-plus-lg"></i></span>
        </li>
    )
}

function FrequentlyAskedQuestions() {
    return (
        <div className="full-page col items-center">
            <h1 className="text-5xl text-green-600 font-semibold">Frequently Asked Questions</h1>
            <ul className="w-[90%] mx-auto mt-5">
                <FAQCard question="How to get featured?" />
                <FAQCard question="How much time does it take to get refund?" />
                <FAQCard question="How to join affiliate program?" />
                <FAQCard question="How to start an offer?" />
                <FAQCard question="How to create a coupon?" />
                <FAQCard question="How to cancel booking?" />
            </ul>
        </div>
    )
}

export default FrequentlyAskedQuestions;