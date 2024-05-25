import React from 'react';
import Sprite from './Sprite';

interface GroupProps {
    title: string;
    sprites: { name: string; imageUrl: string; description: string }[];
    onSelectSprite: (newSrc: string) => void;

}

const Group: React.FC<GroupProps> = ({ title, sprites, onSelectSprite }) => {
    return (
        <div className="group mb-5">
            <h2>{title}</h2>
            <ul className="flex flex-wrap justify-start">
                {sprites.map((sprite, index) => (
                    <li key={index} className="  box-border hover:transform hover:scale-110">
                        <Sprite
                            name={sprite.name}
                            imageUrl={sprite.imageUrl}
                            description={sprite.description}
                            onSelectSprite={onSelectSprite}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Group;