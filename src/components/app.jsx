import { h, Component } from 'preact';
import style from './app.less';
import { sendPortalCommand } from '../lib/portal';
import Popup from './popup/popup';
import Banner from './banner/banner';

export default class App extends Component {
	state = {
		store: this.props.store
	};

	onSave = () => {
		const { store, notify } = this.props;
		store.persist();
		notify('onSubmit');
		store.toggleConsentToolShowing(false);
	};


	updateState = (store) => {
		this.setState({ store });
	};

	componentWillMount() {
		const { store } = this.props;
		store.subscribe(this.updateState);
	}

	render(props, state) {

		const {
			store,
		} = state;

		const {
			isModalShowing,
			isBannerShowing,
			toggleModalShowing
		} = store;

		return (
			<div class={style.gdpr}>
				<Banner isShowing={isBannerShowing}
						isModalShowing={isModalShowing}
						onSave={this.onSave}
						onShowModal={toggleModalShowing}
				/>
				<Popup store={store}
					   onSave={this.onSave}
				/>
			</div>
		);
	}
}
