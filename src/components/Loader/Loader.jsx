import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <InfinitySpin width="200" color="#4d56a9" />
    </div>
  );
};
