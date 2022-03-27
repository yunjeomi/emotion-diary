import React from "react";

type EmotionItemProps = {
  handleEmotion: (emotion:number) => void;
  name: string;
  emotion: number;
  isSelected:boolean
};

const EmotionItem = ({ name, emotion, handleEmotion, isSelected }: EmotionItemProps) => {
  
  return (
    <div className={["EmotionItem", isSelected?`isSelected_emotion${emotion}`: `emotion_off`].join(" ")} onClick={()=>handleEmotion(emotion)}>
      <div className="emotion_img">
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt="emotion"
        />
      </div>
      <div className="emotion_name">{name}</div>
    </div>
  );
};

export default EmotionItem;
