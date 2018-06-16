import React, { Component } from 'react';

// @components
import Player from '../layouts/player';
import VideoList from '../layouts/video-list';

// @context
import { Provider } from '../context';

// @data
// import { videos } from '../data';

import './style.scss';

export class App extends Component {
    state = {
        // eslint-disable-next-line react/no-unused-state
        activeVideoIndex: 0,
        activeVideo: null,
        disabledControls: {
            next: true,
            previous: true
        },
        // eslint-disable-next-line react/no-unused-state
        mainVideo: null,
        // eslint-disable-next-line react/no-unused-state
        videoRef: null,
        videos: []
    }

    setDisabledControls = (activeVideo) => {
        const newActiveVideo = activeVideo || this.state.activeVideo;
        const currentDisabledControls = { ...this.state.disabledControls };
        const currentActiveVideoIndex = this.state.videos.findIndex(video => video.id === newActiveVideo.id);
        currentDisabledControls.next = currentActiveVideoIndex === this.state.videos.length - 1;
        currentDisabledControls.previous = currentActiveVideoIndex === 0;
        return currentDisabledControls;
    };

    setActiveVideo = (id) => {
        const newActiveVideo = this.state.videos.filter(video => video.id === id)[0];
        this.setState({
            activeVideo: newActiveVideo,
            disabledControls: this.setDisabledControls(newActiveVideo)
        });
    }

    setPlayingActiveVideo = () => {
        const currentActiveVideo = { ...this.state.activeVideo };
        // eslint-disable-next-line react/no-unused-state
        this.setState({ activeVideo: currentActiveVideo });
    }

    playVideo = (type = 'previous') => {
        const { activeVideo, videos } = this.state;
        const numberOfVideos = videos.length;
        const currentActiveVideoIndex = videos.findIndex(video => video.id === activeVideo.id);
        let newActiveVideoIndex = currentActiveVideoIndex;
        if (type === 'next' && currentActiveVideoIndex < numberOfVideos - 1) {
            newActiveVideoIndex += 1;
        } else if (currentActiveVideoIndex > 0) {
            newActiveVideoIndex -= 1;
        }
        this.setState({
            activeVideo: videos[newActiveVideoIndex],
            disabledControls: this.setDisabledControls(videos[newActiveVideoIndex])
        });
    }

    render() {
        const contextValue = {
            globalData: this.state,
            globalHandle: {
                playVideo: this.playVideo,
                setActiveVideo: this.setActiveVideo,
                setPlayingActiveVideo: this.setPlayingActiveVideo
            }
        };

        return (
            <Provider value={contextValue}>
                <div className="video-clipper">
                    <Player />
                    <VideoList />
                </div>
            </Provider>
        );
    }
}

export default App;
