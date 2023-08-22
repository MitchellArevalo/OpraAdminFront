import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const Page = () => {
  return (

   <div>
    este es el componente de ventas
   </div>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
