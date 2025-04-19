import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { EmojiSmile, Image as ImageIcon } from 'react-bootstrap-icons';

const MAX_TWEET_LENGTH = 280;

export const PostBox: React.FC = () => {
    const [tweet, setTweet] = useState('');

    const remainingChars = MAX_TWEET_LENGTH - tweet.length;
    const isValid = tweet.trim().length > 0 && tweet.length <= MAX_TWEET_LENGTH;

    const handleTweetSubmit = () => {
        if (isValid) {
            console.log('Tweet enviado:', tweet);
            setTweet('');
        }
    };

    return (
        <Card className="mb-4 shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#f8f9fa',maxHeight:'500px'}}>
            <Card.Body style={{ borderRadius: '10px',  maxHeight: '200px', overflowY: 'auto' }}>
                <Row>
                    <Col>
                        <Form.Group controlId="tweetTextarea">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="¿Qué está pasando?"
                                value={tweet}
                                onChange={(e) => setTweet(e.target.value)}
                                maxLength={MAX_TWEET_LENGTH}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="d-flex gap-3 text-primary">
                                <ImageIcon role="button" />
                                <EmojiSmile role="button" />
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className={`text-${remainingChars < 0 ? 'danger' : 'secondary'}`}>
                                    {remainingChars}
                                </span>
                                <Button
                                    variant="primary"
                                    onClick={handleTweetSubmit}
                                    disabled={!isValid}
                                >
                                    Publicar
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PostBox;