import React from 'react';
import Table from '../components/Table';
import 'antd/dist/antd.min.css';
import { Layout, Breadcrumb, PageHeader } from 'antd';

const { Content, Footer } = Layout;

export const Home = () => {
  return (
    <div>
      <Layout className='layout'>
        <PageHeader className='site-page-header' title='TODO' />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className='site-layout-content'>
            <Table />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by Sourav Pakhira
        </Footer>
      </Layout>
    </div>
  );
};

// export default Home
