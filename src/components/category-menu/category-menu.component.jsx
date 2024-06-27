import './category-menu.style.scss';
import ListComponent from '../list-component/list-component.compoment';

const CategoryMenu = ({ categories }) => { // Destructuring 'categories' from props
  return (
    <div className='categories-container'>
      {categories.map((lol) => (
        <ListComponent key={lol.id} category={lol} />
      ))}
    </div>
  );
};

export default CategoryMenu;
