import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles

  const Toxic = (props: {
    Title1: { Text: string, Value: string },
    Title2: { Text: string, Value: string },
    Title3: { Text: string, Value: string },
    fs1: number, fs2: number
  }) => {
    let fs1 = props.fs1 + 5
    let fs2 = props.fs2 + 15
    return <div>

      <div style={{ height: 80, width: 200, borderRadius: 10, backgroundColor: "#62C3F77E", padding: "10px", margin: "10px"}}>
        <span style={{ color: "#03014f", opacity: 1, fontFamily: "mether", fontSize: fs1 }}>{props.Title1.Text}</span>
        <br-xx />
        <span style={{ color: "#03013c", opacity: 1, fontFamily: "pop", fontSize: fs2 }}>{props.Title1.Value}</span>
      </div>

      <div style={{ height: 80, width: 200, borderRadius: 10, backgroundColor: "#62c3f77E", padding: "10px", margin: "10px" }}>
        <span style={{ color: "#03014f", opacity: 1, fontFamily: "mether", fontSize: fs1 }}>{props.Title2.Text}</span>
        <br-xx />
        <span style={{ color: "#03013c", opacity: 1, fontFamily: "pop", fontSize: fs2 }}>{props.Title2.Value}</span>
      </div>

      <div style={{ height: 80, width: 200, borderRadius: 10, backgroundColor: "#62c3f77E", padding: "10px", margin: "10px" }}>
        <span style={{ color: "#03014f", opacity: 1, fontFamily: "mether", fontSize: fs1 }}>{props.Title3.Text}</span>
        <br-xx />
        <span style={{ color: "#03013c", opacity: 1, fontFamily: "pop", fontSize: fs2 }}>{props.Title3.Value}</span>
      </div>

    </div>
  }


  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />
      <Window title={"weather"} style={{
        minHeight: 200, margin: 10, width: "calc(100% - 20px)",
        boxSizing: "border-box",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(https://irmapserver.ir/research/25/cloud.webp)"
      }}>


        <div style={{
          height: 340, width: "calc(100% - 20px)", borderRadius: 10, backgroundColor: "#ffffff3b",
          padding: "10px", margin: "10px",
        }}>

          <f-c>

            <img src="/maploc.webp" style={{width:50 , height:50, objectFit:"contain"}} />
            <sp-1/>
            <span style={{
              color: "#03014f", opacity: 1,
              fontFamily: "mether", fontSize: 32
            }}>
              Iran Fars Shiraz</span>

              
          </f-c>


          <pre>
            {/* {JSON.stringify(props.data,null,2)}  */}
          </pre>
          <f-c>
            <Toxic
              fs1={10}
              fs2={4}
              Title1={{ Text: "Feels like", Value: props.data.current_condition[0].FeelsLikeC + "°" }}
              Title2={{ Text: "Humidity", Value: props.data.current_condition[0].humidity + " %" }}
              Title3={{ Text: "Visibility", Value: props.data.current_condition[0].visibility + "km" }}
            />

            <Toxic
              fs1={10}
              fs2={4}
              Title1={{ Text: "UV Index", Value: props.data.current_condition[0].uvIndex }}
              Title2={{ Text: "Wind", Value: props.data.current_condition[0].windspeedKmph + "km/h" }}
              Title3={{ Text: "Pressure", Value: props.data.current_condition[0].pressure + "mb" }}
            />

            <Toxic
              fs1={10}
              fs2={2}
              Title1={{ Text: "Sunrise", Value: props.data.weather[0].astronomy[0].sunrise }}
              Title2={{ Text: "Sunset", Value: props.data.weather[0].astronomy[0].sunset }}
              Title3={{ Text: "Moon phase", Value: props.data.weather[0].astronomy[0].moon_phase }}
            />
          </f-c>








        </div>

        <sp-1 />

        <div style={{ width: "100%" , display:"flex", flex:1, alignItems:"right", justifyContent:"right", color:"white"}}>
          <center style={{ fontSize: 10, backgroundColor: "#06295AB5", borderRadius: 5, width: 250, height:20, paddingTop:4, marginRight:5, marginBottom: 9 }}>
          تیم پژوهشی تورینگ  (پیکسل)
          </center>
        </div>




      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await (await fetch("https://irmapserver.ir/research/api/weather/"))
  let data = await res.json()

  return {
    props: {
      data: global.QSON.stringify({
        data,
        session,
        // nlangs,
      })
    },
  }
}