import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	CustomCSSProperties,
	initialArticleState
} from '../../constants/articleProps';
import styles from './index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<CustomCSSProperties>(initialArticleState);

	return (
		<div className={styles.main} style={articleState}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</div>
	);
};
