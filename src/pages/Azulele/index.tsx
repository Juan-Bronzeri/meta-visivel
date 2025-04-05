import React from 'react';
import { Card, Avatar, Typography, Image, Space, Button } from 'antd';
import {
    HeartOutlined,
    MessageOutlined,
    SendOutlined,
    BookOutlined,
    MoreOutlined,
} from '@ant-design/icons';
// Importar os estilos CSS Modules
import styles from './AzulelePage.module.css';

const { Text, Link } = Typography;

// Dados mocados para os stories
const storiesData = [
    { username: 'zzztakeabr...', avatar: 'https://i.pravatar.cc/64?img=1' },
    { username: 'ju_desouz...', avatar: 'https://i.pravatar.cc/64?img=2' },
    { username: 'rapha_ara...', avatar: 'https://i.pravatar.cc/64?img=3' },
    { username: 'lanisnoron...', avatar: 'https://i.pravatar.cc/64?img=4' },
    { username: 'lari_borsetti', avatar: 'https://i.pravatar.cc/64?img=5' },
    { username: 'marcoscbpjr', avatar: 'https://i.pravatar.cc/64?img=6' },
    { username: 'luiz_tolen', avatar: 'https://i.pravatar.cc/64?img=7' },
    { username: 'juliaasever...', avatar: 'https://i.pravatar.cc/64?img=8' },
    // Add more stories as needed
];

const AzulelePage: React.FC = () => {
    // Dados mocados para simular o post
    const postData = {
        username: 'ctx_alienigena_',
        userAvatar: 'https://i.pravatar.cc/32?img=9', // Different avatar for post user
        postTime: '1h',
        imageUrl: 'https://source.unsplash.com/random/600x600?beach,surf',
        likes: 123,
        firstLiker: 'wiliandeoliveiras',
        commentCount: 2,
    };

    return (
        <div className={styles.pageContainer}>
            {/* Barra de Stories */}
            <div className={styles.storiesBar}>
                <Space size='middle'>
                    {storiesData.map((story, index) => (
                        <div key={index} className={styles.storyItem}>
                            <div className={styles.storyAvatarBorder}>
                                <Avatar src={story.avatar} size={56} />
                            </div>
                            <Text
                                className={styles.storyUsername}
                                ellipsis={{ tooltip: story.username }}
                            >
                                {story.username}
                            </Text>
                        </div>
                    ))}
                </Space>
            </div>

            {/* Card principal simulando o post */}
            <Card className={styles.postCard}>
                {/* Cabeçalho do Post */}
                <div className={styles.postHeader}>
                    <Space align='center'>
                        <Avatar src={postData.userAvatar} size='small' />
                        <Text strong>{postData.username}</Text>
                        <Text type='secondary'>• {postData.postTime}</Text>
                    </Space>
                    <Button type='text' icon={<MoreOutlined />} />
                </div>

                {/* Imagem do Post */}
                <Image
                    wrapperClassName={styles.postImageWrapper}
                    src={postData.imageUrl}
                    alt='Post image'
                    preview={false} // Desabilitar preview do AntD
                />

                {/* Ações (Like, Comment, Share, Save) */}
                <div className={styles.postActions}>
                    <Space size='middle'>
                        <Button
                            type='text'
                            size='large'
                            icon={<HeartOutlined />}
                        />
                        <Button
                            type='text'
                            size='large'
                            icon={<MessageOutlined />}
                        />
                        <Button
                            type='text'
                            size='large'
                            icon={<SendOutlined />}
                        />
                    </Space>
                    <Button type='text' size='large' icon={<BookOutlined />} />
                </div>

                {/* Informações de Likes */}
                <div className={styles.postLikes}>
                    <Text strong>
                        Liked by {postData.firstLiker} and others
                    </Text>
                </div>

                {/* Comentários (Placeholder) */}
                <div className={styles.postComments}>
                    <Link href='#'>
                        View all {postData.commentCount} comments
                    </Link>
                    <Text type='secondary'>Add a comment...</Text>
                </div>
            </Card>
        </div>
    );
};

export default AzulelePage;
