import React, { useState, useMemo, useEffect } from 'react';
import { List, Card, Input, Pagination, Image, Empty, Space } from 'antd';
import ImageSpinner from '../ImageSpinner/ImageSpinner'; // Import the spinner

const { Search } = Input;
const { Meta } = Card;

// Export the interface so it can be imported elsewhere
export interface ImageData {
    id: string;
    title: string;
    url: string;
}

interface ImageGridProps {
    images: ImageData[];
}

const ITEMS_PER_PAGE = 10; // 2 linhas de 5 colunas

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

    // Initialize loading state when images change
    useEffect(() => {
        setLoadingImages(new Set(images.map(img => img.id)));
    }, [images]);

    // Filtrar imagens com base no termo de pesquisa
    const filteredImages = useMemo(() => {
        if (!searchTerm) {
            return images;
        }
        return images.filter(img => 
            img.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [images, searchTerm]);

    // Calcular itens para a página atual
    const paginatedImages = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredImages.slice(startIndex, endIndex);
    }, [filteredImages, currentPage]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1); // Resetar para a primeira página ao pesquisar
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleImageLoad = (id: string) => {
        setLoadingImages(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Search
                placeholder="Buscar por título da imagem"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)} // Search as you type
                style={{ maxWidth: 400 }}
                allowClear
            />

            <List
                grid={{ 
                    gutter: 16, // Espaçamento entre cards
                    xs: 1, // 1 coluna em telas extra pequenas
                    sm: 2, // 2 colunas em telas pequenas
                    md: 3, // 3 colunas em telas médias
                    lg: 4, // 4 colunas em telas grandes
                    xl: 5, // 5 colunas em telas extra grandes
                    xxl: 5 // 5 colunas em telas muito grandes
                }}
                dataSource={paginatedImages}
                locale={{ emptyText: <Empty description="Nenhuma imagem encontrada" /> }}
                renderItem={(image) => {
                    const isLoading = loadingImages.has(image.id);
                    return (
                        <List.Item>
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                cover={
                                    isLoading ? (
                                        <ImageSpinner />
                                    ) : (
                                        <Image
                                            alt={image.title}
                                            src={image.url}
                                            preview={false}
                                            height={150}
                                            style={{ objectFit: 'cover' }}
                                            fallback="https://picsum.photos/300/200?grayscale"
                                            onLoad={() => handleImageLoad(image.id)}
                                            onError={() => handleImageLoad(image.id)} // Also stop loading on error
                                        />
                                    )
                                }
                            >
                                <Meta title={image.title} />
                            </Card>
                        </List.Item>
                    );
                }}
            />

            {filteredImages.length > ITEMS_PER_PAGE && (
                <Pagination
                    current={currentPage}
                    pageSize={ITEMS_PER_PAGE}
                    total={filteredImages.length}
                    onChange={handlePageChange}
                    style={{ textAlign: 'center' }}
                    showSizeChanger={false} // Opcional: desabilitar mudança de tamanho da página
                />
            )}
        </Space>
    );
};

export default ImageGrid; 