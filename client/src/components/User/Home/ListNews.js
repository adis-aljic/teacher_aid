import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import classes from "./ListNews.module.css"

const ListNews = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(user);
    const [data, setData] = useState([])
    useEffect(()=>{

        fetch("http://localhost:4000/api/news/list",{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          userId: `${user.id}`,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(resolve => resolve.json())
    .then(data =>
        {

            setData(data)
            // console.log(data)
        } 
            )
            
},[user.id])
    // console.log(data);
return(
    <Card className={classes.card}>
            
            {data.length>0
          ? data.map((news) => (
            <>
            {/* {console.log(news)} */}
                <li key={news.id} className={classes.listNews}>
                  <h1>
                     {news.title}
                    </h1>
                  <br>
                  </br>
                  <a href={news.url} target="_blank" rel="noreferrer" download={true}><img alt="preview" src={news.url}></img></a>
                  <br></br>
                  {news.text}
                  <br>
                  </br>
                  <br></br>
                  <div className={classes.info}>

                  <p>Author :{news.user[0].firstName} {news.user[0].lastName}</p>
                  <p>School : { news.school}</p>
                  <p>Class : { news.schoolClass} - { news.departmant}</p>
                  </div>

                </li>
                  
                <br></br>
              </>
            ))
          : ''}            
    </Card>
)
}

export default ListNews;