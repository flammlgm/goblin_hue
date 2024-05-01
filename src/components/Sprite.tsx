import React from 'react';

interface SpriteProps {
    name: string;
    imageUrl: string;
    description: string;
}

const Sprite: React.FC<SpriteProps> = ({ name, imageUrl, description }) => {
    return (
        <div className="sprite">
            <img src={imageUrl} alt={name} />
            {/* Элемент с названием спрайта */}
            <div className="sprite-name">{name}</div>
            <div className="sprite-info">
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Sprite;