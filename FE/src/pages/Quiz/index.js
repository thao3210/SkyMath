import ContentQuestion from "./ContentQuestion/ContentQuestion";
import MatchingQuestion from "./MatchingQuestion/MatchingQuestion";
import MultipleChoice from "./MultipleChoice/MultipleChoice";
import MultipleResponse from "./MultipleResponse/MultipleResponse";
import OpenEndedQuestion from "./OpenEndedQuestion/OpenEndedQuestion";
import FillBlankQuestion from "./FillBlankQuestion/FillBlankQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion/TrueFalseQuestion";

function Quiz() {
  const jsonData = {
    "questionType": "multiple_choice",
    "data": {
      "question": {
        "question_content_type": "image",
        "question_content": "http://209.145.62.69:2002/resource/image/slide/heroes-2.png"
      },
      "answer": [
        {
          "id": "1",
          "answer_content_type": "text",
          "answer_content": "Lorem ipsum dolor sit amet consectetur adipisicing elit.Nisi sint natus odit maxime exercitationem"
        },
        {
          "id": "2",
          "answer_content_type": "image",
          "answer_content": "http://209.145.62.69:2002/resource/image/slide/heroes-2.png"
        },
        {
          "id": "3",
          "answer_content_type": "image",
          "answer_content": "http://209.145.62.69:2002/resource/image/slide/heroes-2.png"
        },
        {
          "id": "4",
          "answer_content_type": "text",
          "answer_content": "3"
        },
    
      ],
      "correct_answer": 1
    }
  };

  return (
    <>
      {/* <FillBlankQuestion /> */}
      {/* <TrueFalseQuestion /> */}
      {/* <ContentQuestion /> */}
      <MatchingQuestion />
      <MultipleResponse />
      {/* <OpenEndedQuestion /> */}
    </>
  );
}

export default Quiz;