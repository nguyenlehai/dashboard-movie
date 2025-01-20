import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Result
        status="404"
        title="404"
        subTitle={
          <div className="space-y-4">
            <p className="text-lg">
              Sorry, the page you visited does not exist.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button type="primary" onClick={() => navigate('/dashboard')}>
                Back Home
              </Button>
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
          </div>
        }
        className="p-8 rounded-lg"
      />
    </div>
  );
};

export default NotFound;
