import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addHexPrefix } from 'ethereumjs-util';

import translate, { translateRaw } from 'translations';
import { isValidENSAddress } from 'libs/validators';
import { Address } from 'libs/units';
import { ICurrentTo } from 'features/types';
import { AppState } from 'features/reducers';
import * as selectors from 'features/selectors';
import { walletSelectors } from 'features/wallet';
import { ensSelectors } from 'features/ens';
import { Identicon, Spinner } from 'components/ui';
import { Query } from 'components/renderCbs';
import { CallbackProps } from 'components/AddressFieldFactory';
import AddressFieldDropdown from './AddressFieldDropdown';
import './AddressInputFactory.scss';

import * as configSelectors from 'features/config/selectors';

interface StateProps {
  currentTo: ICurrentTo;
  label: string | null;
  isValid: boolean;
  isLabelEntry: boolean;
  isResolving: boolean;
  chainId: number;
}

interface OwnProps {
  isSelfAddress?: boolean;
  showLabelMatch?: boolean;
  isFocused?: boolean;
  onChange(ev: React.FormEvent<HTMLInputElement>): void;
  onFocus(ev: React.FormEvent<HTMLInputElement>): void;
  onBlur(ev: React.FormEvent<HTMLInputElement>): void;
  withProps(props: CallbackProps): React.ReactElement<any> | null;
}

const ENSStatus: React.SFC<{
  isLoading: boolean;
  ensAddress: string;
  rawAddress: string;
  chainId: number;
}> = ({ isLoading, ensAddress, rawAddress, chainId }) => {
  const isENS = isValidENSAddress(ensAddress);
  const text =
    chainId === 30 || chainId === 31
      ? translate('LOADING_RNS_ADDRESS')
      : translate('LOADING_ENS_ADDRESS');

  if (isLoading) {
    return (
      <React.Fragment>
        <Spinner /> {text}
      </React.Fragment>
    );
  } else {
    return isENS ? <React.Fragment>{`Resolved Address: ${rawAddress}`}</React.Fragment> : null;
  }
};

type Props = OwnProps & StateProps;

class AddressInputFactoryClass extends Component<Props> {
  private getIsENSAddress(name: string) {
    const { chainId } = this.props;

    if (chainId === 30 || chainId === 31) {
      return name.includes('.rif') || name.includes('.rsk') || name.includes('.iov');
    }

    return name.includes('.eth');
  }

  public render() {
    const {
      label,
      currentTo,
      onChange,
      onFocus,
      onBlur,
      isValid,
      isLabelEntry,
      withProps,
      showLabelMatch,
      isSelfAddress,
      isResolving,
      isFocused
    } = this.props;
    const { value } = currentTo;
    const addr = addHexPrefix(value ? value.toString('hex') : '0');
    const inputClassName = `AddressInput-input ${label ? 'AddressInput-input-with-label' : ''}`;
    const sendingTo = `${translateRaw('SENDING_TO')} ${label}`;
    const isENSAddress = this.getIsENSAddress(currentTo.raw);

    return (
      <div className="AddressInput form-group">
        <div className={inputClassName}>
          <Query
            params={['readOnly']}
            withQuery={({ readOnly }) =>
              withProps({
                currentTo,
                isValid,
                isLabelEntry,
                onChange,
                onFocus,
                onBlur,
                readOnly: !!(readOnly || this.props.isResolving || isSelfAddress)
              })
            }
          />
          <ENSStatus
            ensAddress={currentTo.raw}
            isLoading={isResolving}
            rawAddress={addr}
            chainId={this.props.chainId}
          />
          {isFocused && !isENSAddress && <AddressFieldDropdown />}
          {showLabelMatch &&
            label && (
              <div title={sendingTo} className="AddressInput-input-label">
                <i className="fa fa-check" /> {sendingTo}
              </div>
            )}
        </div>
        <div className="AddressInput-identicon">
          <Identicon address={addr} />
        </div>
      </div>
    );
  }
}

export const AddressInputFactory = connect((state: AppState, ownProps: OwnProps) => {
  let currentTo: ICurrentTo;
  if (ownProps.isSelfAddress) {
    const wallet = walletSelectors.getWalletInst(state);
    const addr = wallet ? wallet.getAddressString() : '';
    currentTo = {
      raw: addr,
      value: Address(addr)
    };
  } else {
    currentTo = selectors.getCurrentTo(state);
  }

  return {
    currentTo,
    label: selectors.getCurrentToLabel(state),
    isResolving: ensSelectors.getResolvingDomain(state),
    isValid: selectors.isValidCurrentTo(state),
    isLabelEntry: selectors.isCurrentToLabelEntry(state),
    chainId: configSelectors.getNetworkChainId(state)
  };
})(AddressInputFactoryClass);
