import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";



const CommonLayout = ({children} :{children:React.ReactNode}) => {
    return (
        <div className="flex flex-col min-h-screen container mx-auto">
          <Navbar></Navbar>
          <div className="min-h-screen container mx-auto">
          {children}
          </div>
           <Footer></Footer>
        </div>
    );
};

export default CommonLayout;