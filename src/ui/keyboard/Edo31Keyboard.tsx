import { KEYBOARD31_ONE_OCTAVE } from '../../domain/pitch/keyboard31';
import './Edo31Keyboard.css';

type Edo31KeyboardProps = {
  onKeyPress?: (payload: { step: number; spelling: string }) => void;
};

function Edo31Keyboard({ onKeyPress }: Edo31KeyboardProps) {
  return (
    <section className="edo31-keyboard" aria-label="31-EDO on-screen keyboard">
      <h3>31-EDO Keyboard (one octave)</h3>
      <div className="edo31-keyboard__keys" role="group" aria-label="31 edo keys">
        {KEYBOARD31_ONE_OCTAVE.map((key) => (
          <button
            key={`${key.step}-${key.spelling}`}
            type="button"
            className="edo31-keyboard__key"
            onClick={() => onKeyPress?.({ step: key.step, spelling: key.spelling })}
            aria-label={`Step ${key.step}: ${key.spelling}`}
          >
            <span className="edo31-keyboard__spelling">{key.spelling}</span>
            <span className="edo31-keyboard__step">{key.step}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Edo31Keyboard;
