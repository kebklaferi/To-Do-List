import "./app.scss";
import {CustomList} from "./list/CustomList";
export const App = () => {
  return(
      <div className="container">
          <div className="container center-items">
              <CustomList>

              </CustomList>
          </div>
      </div>
  )
}