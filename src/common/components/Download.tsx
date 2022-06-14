import {FC, useEffect, useState} from "react";
import {Card, List} from "antd";
import styled from "styled-components";



interface IText {
    title: string,
    fileId: number
}

type Sound = Omit<IText, 'fileId'>

export const Download: FC = () => {
    const [song, setSong] = useState<Sound[] | []>([])
    const [text, setText] = useState<IText[] | []>([])


    const fetchReqServer = () => {
        fetch('http://localhost:3002/loadFiles')
            .then(res => res.json())
            .then(res => {
                const song = res.filter((el: IText) => el.title === 'Sound')
                const text = res.filter((el: IText) => el.title !== 'Sound')
                setSong(song)
                setText(text)
            })
    }
    const fetchForDocServer = (id: number) => {
        fetch(`http://localhost:3002/loadDoc/${id}`)
            .then(res => res.text())
            .then(res => {
                let link = document.createElement('a');
                link.download = `report ${id}.txt`;
                const blob = new Blob([res], {type: 'text/plain'});
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href)
            })
    }
    const fetchForSoundServer = () => {
        fetch(`http://localhost:3002/loadSound}`)
            .then(res => res.blob())
            .then(res => {
                let link = document.createElement('a');
                link.download = `sound.mp3`;
                const blob = new Blob([res], {type: 'audio/mp3'});
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href)
            })
    }


    useEffect(() => {
        // const interval = setInterval(() => {
        //     fetchReqServer()
        // }, 10000);
        // return () => clearInterval(interval);
        let timerId = setTimeout(function tick() {
            fetchReqServer()
            timerId = setTimeout(tick, 10000); // (*)
        }, 0);
        return () => clearTimeout(timerId)
    }, [])


    return (
        <Wrapper>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 10,
                }}
                dataSource={text}
                renderItem={(item)  => (
                    <CardStyle  bordered={false}>
                        <a download="hello.txt" id="link-text"  onClick={() => fetchForDocServer(item.fileId)}>{item.title}</a>
                    </CardStyle>
                )}
            />
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 10,
                }}
                dataSource={song}
                renderItem={(item)  => (
                    <CardStyle  bordered={false}>
                        <a id="link"   onClick={fetchForSoundServer}>{item.title}</a>
                    </CardStyle>
                )}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  & > div {
    width: 100%;
  }
`
const CardStyle = styled(Card)`
    margin-bottom: 5px;
   padding: 0;
  
  .ant-card-body {
    padding: 10px;
  }
`
