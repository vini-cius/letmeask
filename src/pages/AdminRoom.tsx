import { useHistory, useParams } from 'react-router-dom';

import { database } from '../services/firebase';

import { DefaultButton } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { ThemeSwitch } from '../components/ThemeSwitch';

import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { PageRoom } from '../styles/room';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { theme } = useTheme();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta ?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }

  return (
    <PageRoom>
      <header>
        <div className="content">
          <img src={theme.title === 'dark' ? logoDarkImg : logoImg} alt="letmeask" />

          <div>
            <RoomCode code={roomId} />

            <DefaultButton isOutlined onClick={handleEndRoom}>Encerrar Sala</DefaultButton>
            
            <ThemeSwitch /> 
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >

                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              )
            })
          }
        </div>
      </main>
    </PageRoom>
  );
}