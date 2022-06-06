import {Breadcrumb} from 'antd';
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";


export const BreadcrumbComponent = () => {
    const location = useLocation();
    const pathBread = location.pathname.split('/')

    const BreadcrumbItems = pathBread.map((path, index) => {
        if (index === 0) return null;
        const url = `${pathBread.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{path}</Link>
            </Breadcrumb.Item>
        );
    });
    return (
        <BreadcrumbStyle>{BreadcrumbItems}</BreadcrumbStyle>
    );
};

const BreadcrumbStyle = styled(Breadcrumb)`
  padding-bottom: 10px;
  border-bottom: 1px solid #ebe7e7;
`