import React from 'react';
import Sprite from './Sprite';

interface GroupProps {
    title: string;
    sprites: { name: string; imageUrl: string; description: string }[];
    onSelectSprite: (newSrc: string) => void;

}

const Group: React.FC<GroupProps> = ({ title, sprites, onSelectSprite }) => {
    return (
        <div className="group">
            <h2>{title}</h2>
            <ul className="sprites-container">
                {sprites.map((sprite, index) => (
                    <li key={index} className="sprite">
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