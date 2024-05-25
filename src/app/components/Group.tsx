import React from 'react';
import Sprite from './Sprite';

interface GroupProps {
    title: string;
    sprites: { name: string; imageUrl: string; description: string }[];
}

const Group: React.FC<GroupProps> = ({ title, sprites }) => {
    return (
        <div className="group">
            <h2>{title}</h2>
            <ul className="sprites-container">
                {sprites.map((sprite, index) => (
                    <li key={index} className="sprite">
                        <Sprite {...sprite} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Group;