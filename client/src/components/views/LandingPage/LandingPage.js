import React, {useState, PureComponent} from 'react'
import { Alert,Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

function StatusSummary(){
  const [message, setMessage] = useState({
    message:'오늘 공부하실 내용은...'
  });
  return(
    <Alert message={message.message} type="info" />
  )
}

// const contentStyle = {
//   width:'1440px',
//   height: '408px',
// };

// function WelcomeImages (){
//   return (
//     <div className="welcome_img_container">
//       <Carousel>
//         <div>
//           <img src="img/main_img.png" alt="main_img"/>
//         </div>
//         <div>
//           <img src="img/mountains.jpeg" style={contentStyle} alt="main_img"/>
//         </div>
//         <div>
//           <img src="img/mountaintrees.jpeg" style={contentStyle} alt="main_img"/>
//         </div>
//         <div>
//           <img src="img/seaview.jpg" style={contentStyle} alt="main_img"/>
//         </div>
//       </Carousel>
//     </div>
//   )
// }


const data = [
  {name: '1일', 한국사: 400},
  {name: '2일', 한국사: 300},
  {name: '3일', 한국사: 200},
  {name: '4일', 한국사: 280},
  {name: '5일', 한국사: 890},
  {name: '6일', 한국사: 230},
  {name: '7일', 한국사: 490},
];

class DailyChart extends PureComponent {
  render() {
    return (
      <div className="daily_chart_container">
        <BarChart
          width={240}
          height={300}
          data={data}
          fontSize={9}
          margin={{
            top: 20, right: 0, left: -30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="한국사" fill="#6fbaff" />
        </BarChart>
      </div>
    );
  }
}


const { Meta } = Card;

function BookAdCard(){
  return(
    <Card
      hoverable
      style={{ width: 200 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
      <Meta title="책이름" description="책설명 블라블라...." />
    </Card>
  )
}


function Main() {
  return (
    <div className="main_page_container">
      <StatusSummary />
      {/* <WelcomeImages /> */}
      <DailyChart/>
      <div className="book_ads_card_container">
        <BookAdCard/>
        <BookAdCard/>
        <BookAdCard/>
        <BookAdCard/>
        <BookAdCard/>
        <BookAdCard/>
      </div>   
    </div>
  )
}

export default Main