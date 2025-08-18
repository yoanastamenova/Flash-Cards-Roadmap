import React from 'react';
import "./card.css";
import "../../data/questions.json"

const Card = () => {
  return (
    <div className='card-body'>
        <form>
          <fieldset>
            <legend>Question</legend>
            <div>
              <input type="radio" id="contactChoice1" name="contact" value="email" defaultChecked />
              <label htmlFor="contactChoice1">Email</label>

              <input type="radio" id="contactChoice2" name="contact" value="phone" />
              <label htmlFor="contactChoice2">Phone</label>

              <input type="radio" id="contactChoice3" name="contact" value="mail" />
              <label htmlFor="contactChoice3">Mail</label>
            </div>
          <div>
           <button type="submit">Submit</button>
          </div>
          </fieldset>
        </form>
      </div>
  );
};

export default Card;