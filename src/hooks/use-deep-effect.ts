/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { useRef, useEffect, EffectCallback } from 'react';

export const useDeepEffect = (callback: EffectCallback, dependency: any[]) => {
  const isArrayDeepEqual = (x: any[], y: any[]) => {
    if (x.length !== y.length) return false;
    return _(x).differenceWith(y, _.isEqual).isEmpty();
  };

  const useDeepComparison = (dep: any[]) => {
    const ref = useRef<any[]>([]);
    if (!isArrayDeepEqual(ref.current, dep) || !ref.current.length) {
      ref.current = dep;
    }
    return ref.current;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, useDeepComparison(dependency));
};
