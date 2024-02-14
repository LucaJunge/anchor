var ii = Object.defineProperty;
var oi = (f, e, t) => e in f ? ii(f, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : f[e] = t;
var Nt = (f, e, t) => (oi(f, typeof e != "symbol" ? e + "" : e, t), t);
import { Ray as ri, Plane as ai, MathUtils as ds, EventDispatcher as Tt, Vector3 as X, MOUSE as Fe, TOUCH as ze, Quaternion as xt, Spherical as gn, Vector2 as se, MeshBasicMaterial as _e, SphereGeometry as rt, BoxGeometry as Ge, PlaneGeometry as wn, Mesh as ne, CylinderGeometry as fs, BufferGeometry as He, Float32BufferAttribute as Pt, TrianglesDrawMode as ci, TriangleFanDrawMode as Wt, TriangleStripDrawMode as ps, Loader as ms, LoaderUtils as tt, FileLoader as At, Color as ve, LinearSRGBColorSpace as de, SpotLight as li, PointLight as ui, DirectionalLight as hi, SRGBColorSpace as Pe, MeshPhysicalMaterial as be, Matrix4 as Ue, InstancedMesh as ys, InstancedBufferAttribute as di, Object3D as at, TextureLoader as fi, ImageBitmapLoader as pi, BufferAttribute as nt, InterleavedBuffer as mi, InterleavedBufferAttribute as yi, LinearFilter as gs, LinearMipmapLinearFilter as ws, RepeatWrapping as Xt, PointsMaterial as gi, Material as It, LineBasicMaterial as wi, MeshStandardMaterial as ct, DoubleSide as vi, PropertyBinding as bi, SkinnedMesh as xi, LineSegments as Ai, Line as vs, LineLoop as Ei, Points as Ti, Group as Lt, PerspectiveCamera as bs, OrthographicCamera as Si, Skeleton as _i, AnimationClip as Ri, Bone as Mi, InterpolateLinear as xs, ColorManagement as vn, NearestFilter as Ci, NearestMipmapNearestFilter as Ni, LinearMipmapNearestFilter as Pi, NearestMipmapLinearFilter as Ii, ClampToEdgeWrapping as Li, MirroredRepeatWrapping as Oi, InterpolateDiscrete as Fi, FrontSide as zi, Texture as bn, VectorKeyframeTrack as xn, NumberKeyframeTrack as An, QuaternionKeyframeTrack as En, Box3 as ki, Sphere as Bi, Interpolant as ji, DynamicDrawUsage as Di, Scene as Hi, WebGLRenderer as qi, AmbientLight as Gi, ConeGeometry as Ui, IcosahedronGeometry as Vi, TorusGeometry as Wi } from "three";
const Tn = { type: "change" }, Ot = { type: "start" }, Sn = { type: "end" }, dt = new ri(), _n = new ai(), Xi = Math.cos(70 * ds.DEG2RAD);
class Ki extends Tt {
  constructor(e, t) {
    super(), this.object = e, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new X(), this.cursor = new X(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Fe.ROTATE, MIDDLE: Fe.DOLLY, RIGHT: Fe.PAN }, this.touches = { ONE: ze.ROTATE, TWO: ze.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return r.phi;
    }, this.getAzimuthalAngle = function() {
      return r.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(b) {
      b.addEventListener("keydown", Mt), this._domElementKeyEvents = b;
    }, this.stopListenToKeyEvents = function() {
      this._domElementKeyEvents.removeEventListener("keydown", Mt), this._domElementKeyEvents = null;
    }, this.saveState = function() {
      n.target0.copy(n.target), n.position0.copy(n.object.position), n.zoom0 = n.object.zoom;
    }, this.reset = function() {
      n.target.copy(n.target0), n.object.position.copy(n.position0), n.object.zoom = n.zoom0, n.object.updateProjectionMatrix(), n.dispatchEvent(Tn), n.update(), i = s.NONE;
    }, this.update = function() {
      const b = new X(), k = new xt().setFromUnitVectors(e.up, new X(0, 1, 0)), U = k.clone().invert(), V = new X(), ee = new xt(), Ae = new X(), oe = 2 * Math.PI;
      return function(si = null) {
        const yn = n.object.position;
        b.copy(yn).sub(n.target), b.applyQuaternion(k), r.setFromVector3(b), n.autoRotate && i === s.NONE && O(M(si)), n.enableDamping ? (r.theta += a.theta * n.dampingFactor, r.phi += a.phi * n.dampingFactor) : (r.theta += a.theta, r.phi += a.phi);
        let fe = n.minAzimuthAngle, pe = n.maxAzimuthAngle;
        isFinite(fe) && isFinite(pe) && (fe < -Math.PI ? fe += oe : fe > Math.PI && (fe -= oe), pe < -Math.PI ? pe += oe : pe > Math.PI && (pe -= oe), fe <= pe ? r.theta = Math.max(fe, Math.min(pe, r.theta)) : r.theta = r.theta > (fe + pe) / 2 ? Math.max(fe, r.theta) : Math.min(pe, r.theta)), r.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, r.phi)), r.makeSafe(), n.enableDamping === !0 ? n.target.addScaledVector(l, n.dampingFactor) : n.target.add(l), n.target.sub(n.cursor), n.target.clampLength(n.minTargetRadius, n.maxTargetRadius), n.target.add(n.cursor), n.zoomToCursor && S || n.object.isOrthographicCamera ? r.radius = H(r.radius) : r.radius = H(r.radius * c), b.setFromSpherical(r), b.applyQuaternion(U), yn.copy(n.target).add(b), n.object.lookAt(n.target), n.enableDamping === !0 ? (a.theta *= 1 - n.dampingFactor, a.phi *= 1 - n.dampingFactor, l.multiplyScalar(1 - n.dampingFactor)) : (a.set(0, 0, 0), l.set(0, 0, 0));
        let Ct = !1;
        if (n.zoomToCursor && S) {
          let Ke = null;
          if (n.object.isPerspectiveCamera) {
            const Ye = b.length();
            Ke = H(Ye * c);
            const ht = Ye - Ke;
            n.object.position.addScaledVector(A, ht), n.object.updateMatrixWorld();
          } else if (n.object.isOrthographicCamera) {
            const Ye = new X(T.x, T.y, 0);
            Ye.unproject(n.object), n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c)), n.object.updateProjectionMatrix(), Ct = !0;
            const ht = new X(T.x, T.y, 0);
            ht.unproject(n.object), n.object.position.sub(ht).add(Ye), n.object.updateMatrixWorld(), Ke = b.length();
          } else
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), n.zoomToCursor = !1;
          Ke !== null && (this.screenSpacePanning ? n.target.set(0, 0, -1).transformDirection(n.object.matrix).multiplyScalar(Ke).add(n.object.position) : (dt.origin.copy(n.object.position), dt.direction.set(0, 0, -1).transformDirection(n.object.matrix), Math.abs(n.object.up.dot(dt.direction)) < Xi ? e.lookAt(n.target) : (_n.setFromNormalAndCoplanarPoint(n.object.up, n.target), dt.intersectPlane(_n, n.target))));
        } else
          n.object.isOrthographicCamera && (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c)), n.object.updateProjectionMatrix(), Ct = !0);
        return c = 1, S = !1, Ct || V.distanceToSquared(n.object.position) > o || 8 * (1 - ee.dot(n.object.quaternion)) > o || Ae.distanceToSquared(n.target) > 0 ? (n.dispatchEvent(Tn), V.copy(n.object.position), ee.copy(n.object.quaternion), Ae.copy(n.target), !0) : !1;
      };
    }(), this.dispose = function() {
      n.domElement.removeEventListener("contextmenu", pn), n.domElement.removeEventListener("pointerdown", dn), n.domElement.removeEventListener("pointercancel", Xe), n.domElement.removeEventListener("wheel", fn), n.domElement.removeEventListener("pointermove", Rt), n.domElement.removeEventListener("pointerup", Xe), n._domElementKeyEvents !== null && (n._domElementKeyEvents.removeEventListener("keydown", Mt), n._domElementKeyEvents = null);
    };
    const n = this, s = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let i = s.NONE;
    const o = 1e-6, r = new gn(), a = new gn();
    let c = 1;
    const l = new X(), d = new se(), u = new se(), g = new se(), h = new se(), y = new se(), m = new se(), v = new se(), w = new se(), x = new se(), A = new X(), T = new se();
    let S = !1;
    const N = [], R = {};
    function M(b) {
      return b !== null ? 2 * Math.PI / 60 * n.autoRotateSpeed * b : 2 * Math.PI / 60 / 60 * n.autoRotateSpeed;
    }
    function P(b) {
      const k = Math.abs(b) / (100 * (window.devicePixelRatio | 0));
      return Math.pow(0.95, n.zoomSpeed * k);
    }
    function O(b) {
      a.theta -= b;
    }
    function L(b) {
      a.phi -= b;
    }
    const E = function() {
      const b = new X();
      return function(U, V) {
        b.setFromMatrixColumn(V, 0), b.multiplyScalar(-U), l.add(b);
      };
    }(), I = function() {
      const b = new X();
      return function(U, V) {
        n.screenSpacePanning === !0 ? b.setFromMatrixColumn(V, 1) : (b.setFromMatrixColumn(V, 0), b.crossVectors(n.object.up, b)), b.multiplyScalar(U), l.add(b);
      };
    }(), C = function() {
      const b = new X();
      return function(U, V) {
        const ee = n.domElement;
        if (n.object.isPerspectiveCamera) {
          const Ae = n.object.position;
          b.copy(Ae).sub(n.target);
          let oe = b.length();
          oe *= Math.tan(n.object.fov / 2 * Math.PI / 180), E(2 * U * oe / ee.clientHeight, n.object.matrix), I(2 * V * oe / ee.clientHeight, n.object.matrix);
        } else
          n.object.isOrthographicCamera ? (E(U * (n.object.right - n.object.left) / n.object.zoom / ee.clientWidth, n.object.matrix), I(V * (n.object.top - n.object.bottom) / n.object.zoom / ee.clientHeight, n.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), n.enablePan = !1);
      };
    }();
    function _(b) {
      n.object.isPerspectiveCamera || n.object.isOrthographicCamera ? c /= b : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1);
    }
    function j(b) {
      n.object.isPerspectiveCamera || n.object.isOrthographicCamera ? c *= b : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1);
    }
    function D(b, k) {
      if (!n.zoomToCursor)
        return;
      S = !0;
      const U = n.domElement.getBoundingClientRect(), V = b - U.left, ee = k - U.top, Ae = U.width, oe = U.height;
      T.x = V / Ae * 2 - 1, T.y = -(ee / oe) * 2 + 1, A.set(T.x, T.y, 1).unproject(n.object).sub(n.object.position).normalize();
    }
    function H(b) {
      return Math.max(n.minDistance, Math.min(n.maxDistance, b));
    }
    function J(b) {
      d.set(b.clientX, b.clientY);
    }
    function Q(b) {
      D(b.clientX, b.clientX), v.set(b.clientX, b.clientY);
    }
    function B(b) {
      h.set(b.clientX, b.clientY);
    }
    function xe(b) {
      u.set(b.clientX, b.clientY), g.subVectors(u, d).multiplyScalar(n.rotateSpeed);
      const k = n.domElement;
      O(2 * Math.PI * g.x / k.clientHeight), L(2 * Math.PI * g.y / k.clientHeight), d.copy(u), n.update();
    }
    function Le(b) {
      w.set(b.clientX, b.clientY), x.subVectors(w, v), x.y > 0 ? _(P(x.y)) : x.y < 0 && j(P(x.y)), v.copy(w), n.update();
    }
    function Ve(b) {
      y.set(b.clientX, b.clientY), m.subVectors(y, h).multiplyScalar(n.panSpeed), C(m.x, m.y), h.copy(y), n.update();
    }
    function We(b) {
      D(b.clientX, b.clientY), b.deltaY < 0 ? j(P(b.deltaY)) : b.deltaY > 0 && _(P(b.deltaY)), n.update();
    }
    function ut(b) {
      let k = !1;
      switch (b.code) {
        case n.keys.UP:
          b.ctrlKey || b.metaKey || b.shiftKey ? L(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : C(0, n.keyPanSpeed), k = !0;
          break;
        case n.keys.BOTTOM:
          b.ctrlKey || b.metaKey || b.shiftKey ? L(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : C(0, -n.keyPanSpeed), k = !0;
          break;
        case n.keys.LEFT:
          b.ctrlKey || b.metaKey || b.shiftKey ? O(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : C(n.keyPanSpeed, 0), k = !0;
          break;
        case n.keys.RIGHT:
          b.ctrlKey || b.metaKey || b.shiftKey ? O(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : C(-n.keyPanSpeed, 0), k = !0;
          break;
      }
      k && (b.preventDefault(), n.update());
    }
    function rn(b) {
      if (N.length === 1)
        d.set(b.pageX, b.pageY);
      else {
        const k = Oe(b), U = 0.5 * (b.pageX + k.x), V = 0.5 * (b.pageY + k.y);
        d.set(U, V);
      }
    }
    function an(b) {
      if (N.length === 1)
        h.set(b.pageX, b.pageY);
      else {
        const k = Oe(b), U = 0.5 * (b.pageX + k.x), V = 0.5 * (b.pageY + k.y);
        h.set(U, V);
      }
    }
    function cn(b) {
      const k = Oe(b), U = b.pageX - k.x, V = b.pageY - k.y, ee = Math.sqrt(U * U + V * V);
      v.set(0, ee);
    }
    function Xs(b) {
      n.enableZoom && cn(b), n.enablePan && an(b);
    }
    function Ks(b) {
      n.enableZoom && cn(b), n.enableRotate && rn(b);
    }
    function ln(b) {
      if (N.length == 1)
        u.set(b.pageX, b.pageY);
      else {
        const U = Oe(b), V = 0.5 * (b.pageX + U.x), ee = 0.5 * (b.pageY + U.y);
        u.set(V, ee);
      }
      g.subVectors(u, d).multiplyScalar(n.rotateSpeed);
      const k = n.domElement;
      O(2 * Math.PI * g.x / k.clientHeight), L(2 * Math.PI * g.y / k.clientHeight), d.copy(u);
    }
    function un(b) {
      if (N.length === 1)
        y.set(b.pageX, b.pageY);
      else {
        const k = Oe(b), U = 0.5 * (b.pageX + k.x), V = 0.5 * (b.pageY + k.y);
        y.set(U, V);
      }
      m.subVectors(y, h).multiplyScalar(n.panSpeed), C(m.x, m.y), h.copy(y);
    }
    function hn(b) {
      const k = Oe(b), U = b.pageX - k.x, V = b.pageY - k.y, ee = Math.sqrt(U * U + V * V);
      w.set(0, ee), x.set(0, Math.pow(w.y / v.y, n.zoomSpeed)), _(x.y), v.copy(w);
      const Ae = (b.pageX + k.x) * 0.5, oe = (b.pageY + k.y) * 0.5;
      D(Ae, oe);
    }
    function Ys(b) {
      n.enableZoom && hn(b), n.enablePan && un(b);
    }
    function $s(b) {
      n.enableZoom && hn(b), n.enableRotate && ln(b);
    }
    function dn(b) {
      n.enabled !== !1 && (N.length === 0 && (n.domElement.setPointerCapture(b.pointerId), n.domElement.addEventListener("pointermove", Rt), n.domElement.addEventListener("pointerup", Xe)), ti(b), b.pointerType === "touch" ? Js(b) : Zs(b));
    }
    function Rt(b) {
      n.enabled !== !1 && (b.pointerType === "touch" ? ei(b) : Qs(b));
    }
    function Xe(b) {
      ni(b), N.length === 0 && (n.domElement.releasePointerCapture(b.pointerId), n.domElement.removeEventListener("pointermove", Rt), n.domElement.removeEventListener("pointerup", Xe)), n.dispatchEvent(Sn), i = s.NONE;
    }
    function Zs(b) {
      let k;
      switch (b.button) {
        case 0:
          k = n.mouseButtons.LEFT;
          break;
        case 1:
          k = n.mouseButtons.MIDDLE;
          break;
        case 2:
          k = n.mouseButtons.RIGHT;
          break;
        default:
          k = -1;
      }
      switch (k) {
        case Fe.DOLLY:
          if (n.enableZoom === !1)
            return;
          Q(b), i = s.DOLLY;
          break;
        case Fe.ROTATE:
          if (b.ctrlKey || b.metaKey || b.shiftKey) {
            if (n.enablePan === !1)
              return;
            B(b), i = s.PAN;
          } else {
            if (n.enableRotate === !1)
              return;
            J(b), i = s.ROTATE;
          }
          break;
        case Fe.PAN:
          if (b.ctrlKey || b.metaKey || b.shiftKey) {
            if (n.enableRotate === !1)
              return;
            J(b), i = s.ROTATE;
          } else {
            if (n.enablePan === !1)
              return;
            B(b), i = s.PAN;
          }
          break;
        default:
          i = s.NONE;
      }
      i !== s.NONE && n.dispatchEvent(Ot);
    }
    function Qs(b) {
      switch (i) {
        case s.ROTATE:
          if (n.enableRotate === !1)
            return;
          xe(b);
          break;
        case s.DOLLY:
          if (n.enableZoom === !1)
            return;
          Le(b);
          break;
        case s.PAN:
          if (n.enablePan === !1)
            return;
          Ve(b);
          break;
      }
    }
    function fn(b) {
      n.enabled === !1 || n.enableZoom === !1 || i !== s.NONE || (b.preventDefault(), n.dispatchEvent(Ot), We(b), n.dispatchEvent(Sn));
    }
    function Mt(b) {
      n.enabled === !1 || n.enablePan === !1 || ut(b);
    }
    function Js(b) {
      switch (mn(b), N.length) {
        case 1:
          switch (n.touches.ONE) {
            case ze.ROTATE:
              if (n.enableRotate === !1)
                return;
              rn(b), i = s.TOUCH_ROTATE;
              break;
            case ze.PAN:
              if (n.enablePan === !1)
                return;
              an(b), i = s.TOUCH_PAN;
              break;
            default:
              i = s.NONE;
          }
          break;
        case 2:
          switch (n.touches.TWO) {
            case ze.DOLLY_PAN:
              if (n.enableZoom === !1 && n.enablePan === !1)
                return;
              Xs(b), i = s.TOUCH_DOLLY_PAN;
              break;
            case ze.DOLLY_ROTATE:
              if (n.enableZoom === !1 && n.enableRotate === !1)
                return;
              Ks(b), i = s.TOUCH_DOLLY_ROTATE;
              break;
            default:
              i = s.NONE;
          }
          break;
        default:
          i = s.NONE;
      }
      i !== s.NONE && n.dispatchEvent(Ot);
    }
    function ei(b) {
      switch (mn(b), i) {
        case s.TOUCH_ROTATE:
          if (n.enableRotate === !1)
            return;
          ln(b), n.update();
          break;
        case s.TOUCH_PAN:
          if (n.enablePan === !1)
            return;
          un(b), n.update();
          break;
        case s.TOUCH_DOLLY_PAN:
          if (n.enableZoom === !1 && n.enablePan === !1)
            return;
          Ys(b), n.update();
          break;
        case s.TOUCH_DOLLY_ROTATE:
          if (n.enableZoom === !1 && n.enableRotate === !1)
            return;
          $s(b), n.update();
          break;
        default:
          i = s.NONE;
      }
    }
    function pn(b) {
      n.enabled !== !1 && b.preventDefault();
    }
    function ti(b) {
      N.push(b.pointerId);
    }
    function ni(b) {
      delete R[b.pointerId];
      for (let k = 0; k < N.length; k++)
        if (N[k] == b.pointerId) {
          N.splice(k, 1);
          return;
        }
    }
    function mn(b) {
      let k = R[b.pointerId];
      k === void 0 && (k = new se(), R[b.pointerId] = k), k.set(b.pageX, b.pageY);
    }
    function Oe(b) {
      const k = b.pointerId === N[0] ? N[1] : N[0];
      return R[k];
    }
    n.domElement.addEventListener("contextmenu", pn), n.domElement.addEventListener("pointerdown", dn), n.domElement.addEventListener("pointercancel", Xe), n.domElement.addEventListener("wheel", fn, { passive: !1 }), this.update();
  }
}
class ce {
  /**
   * A vector of length 9, containing all matrix elements.
   */
  /**
   * @param elements A vector of length 9, containing all matrix elements.
   */
  constructor(e) {
    e === void 0 && (e = [0, 0, 0, 0, 0, 0, 0, 0, 0]), this.elements = e;
  }
  /**
   * Sets the matrix to identity
   * @todo Should perhaps be renamed to `setIdentity()` to be more clear.
   * @todo Create another function that immediately creates an identity matrix eg. `eye()`
   */
  identity() {
    const e = this.elements;
    e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1;
  }
  /**
   * Set all elements to zero
   */
  setZero() {
    const e = this.elements;
    e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 0;
  }
  /**
   * Sets the matrix diagonal elements from a Vec3
   */
  setTrace(e) {
    const t = this.elements;
    t[0] = e.x, t[4] = e.y, t[8] = e.z;
  }
  /**
   * Gets the matrix diagonal elements
   */
  getTrace(e) {
    e === void 0 && (e = new p());
    const t = this.elements;
    return e.x = t[0], e.y = t[4], e.z = t[8], e;
  }
  /**
   * Matrix-Vector multiplication
   * @param v The vector to multiply with
   * @param target Optional, target to save the result in.
   */
  vmult(e, t) {
    t === void 0 && (t = new p());
    const n = this.elements, s = e.x, i = e.y, o = e.z;
    return t.x = n[0] * s + n[1] * i + n[2] * o, t.y = n[3] * s + n[4] * i + n[5] * o, t.z = n[6] * s + n[7] * i + n[8] * o, t;
  }
  /**
   * Matrix-scalar multiplication
   */
  smult(e) {
    for (let t = 0; t < this.elements.length; t++)
      this.elements[t] *= e;
  }
  /**
   * Matrix multiplication
   * @param matrix Matrix to multiply with from left side.
   */
  mmult(e, t) {
    t === void 0 && (t = new ce());
    const n = this.elements, s = e.elements, i = t.elements, o = n[0], r = n[1], a = n[2], c = n[3], l = n[4], d = n[5], u = n[6], g = n[7], h = n[8], y = s[0], m = s[1], v = s[2], w = s[3], x = s[4], A = s[5], T = s[6], S = s[7], N = s[8];
    return i[0] = o * y + r * w + a * T, i[1] = o * m + r * x + a * S, i[2] = o * v + r * A + a * N, i[3] = c * y + l * w + d * T, i[4] = c * m + l * x + d * S, i[5] = c * v + l * A + d * N, i[6] = u * y + g * w + h * T, i[7] = u * m + g * x + h * S, i[8] = u * v + g * A + h * N, t;
  }
  /**
   * Scale each column of the matrix
   */
  scale(e, t) {
    t === void 0 && (t = new ce());
    const n = this.elements, s = t.elements;
    for (let i = 0; i !== 3; i++)
      s[3 * i + 0] = e.x * n[3 * i + 0], s[3 * i + 1] = e.y * n[3 * i + 1], s[3 * i + 2] = e.z * n[3 * i + 2];
    return t;
  }
  /**
   * Solve Ax=b
   * @param b The right hand side
   * @param target Optional. Target vector to save in.
   * @return The solution x
   * @todo should reuse arrays
   */
  solve(e, t) {
    t === void 0 && (t = new p());
    const n = 3, s = 4, i = [];
    let o, r;
    for (o = 0; o < n * s; o++)
      i.push(0);
    for (o = 0; o < 3; o++)
      for (r = 0; r < 3; r++)
        i[o + s * r] = this.elements[o + 3 * r];
    i[3 + 4 * 0] = e.x, i[3 + 4 * 1] = e.y, i[3 + 4 * 2] = e.z;
    let a = 3;
    const c = a;
    let l;
    const d = 4;
    let u;
    do {
      if (o = c - a, i[o + s * o] === 0) {
        for (r = o + 1; r < c; r++)
          if (i[o + s * r] !== 0) {
            l = d;
            do
              u = d - l, i[u + s * o] += i[u + s * r];
            while (--l);
            break;
          }
      }
      if (i[o + s * o] !== 0)
        for (r = o + 1; r < c; r++) {
          const g = i[o + s * r] / i[o + s * o];
          l = d;
          do
            u = d - l, i[u + s * r] = u <= o ? 0 : i[u + s * r] - i[u + s * o] * g;
          while (--l);
        }
    } while (--a);
    if (t.z = i[2 * s + 3] / i[2 * s + 2], t.y = (i[1 * s + 3] - i[1 * s + 2] * t.z) / i[1 * s + 1], t.x = (i[0 * s + 3] - i[0 * s + 2] * t.z - i[0 * s + 1] * t.y) / i[0 * s + 0], isNaN(t.x) || isNaN(t.y) || isNaN(t.z) || t.x === 1 / 0 || t.y === 1 / 0 || t.z === 1 / 0)
      throw `Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;
    return t;
  }
  /**
   * Get an element in the matrix by index. Index starts at 0, not 1!!!
   * @param value If provided, the matrix element will be set to this value.
   */
  e(e, t, n) {
    if (n === void 0)
      return this.elements[t + 3 * e];
    this.elements[t + 3 * e] = n;
  }
  /**
   * Copy another matrix into this matrix object.
   */
  copy(e) {
    for (let t = 0; t < e.elements.length; t++)
      this.elements[t] = e.elements[t];
    return this;
  }
  /**
   * Returns a string representation of the matrix.
   */
  toString() {
    let e = "";
    const t = ",";
    for (let n = 0; n < 9; n++)
      e += this.elements[n] + t;
    return e;
  }
  /**
   * reverse the matrix
   * @param target Target matrix to save in.
   * @return The solution x
   */
  reverse(e) {
    e === void 0 && (e = new ce());
    const t = 3, n = 6, s = Yi;
    let i, o;
    for (i = 0; i < 3; i++)
      for (o = 0; o < 3; o++)
        s[i + n * o] = this.elements[i + 3 * o];
    s[3 + 6 * 0] = 1, s[3 + 6 * 1] = 0, s[3 + 6 * 2] = 0, s[4 + 6 * 0] = 0, s[4 + 6 * 1] = 1, s[4 + 6 * 2] = 0, s[5 + 6 * 0] = 0, s[5 + 6 * 1] = 0, s[5 + 6 * 2] = 1;
    let r = 3;
    const a = r;
    let c;
    const l = n;
    let d;
    do {
      if (i = a - r, s[i + n * i] === 0) {
        for (o = i + 1; o < a; o++)
          if (s[i + n * o] !== 0) {
            c = l;
            do
              d = l - c, s[d + n * i] += s[d + n * o];
            while (--c);
            break;
          }
      }
      if (s[i + n * i] !== 0)
        for (o = i + 1; o < a; o++) {
          const u = s[i + n * o] / s[i + n * i];
          c = l;
          do
            d = l - c, s[d + n * o] = d <= i ? 0 : s[d + n * o] - s[d + n * i] * u;
          while (--c);
        }
    } while (--r);
    i = 2;
    do {
      o = i - 1;
      do {
        const u = s[i + n * o] / s[i + n * i];
        c = n;
        do
          d = n - c, s[d + n * o] = s[d + n * o] - s[d + n * i] * u;
        while (--c);
      } while (o--);
    } while (--i);
    i = 2;
    do {
      const u = 1 / s[i + n * i];
      c = n;
      do
        d = n - c, s[d + n * i] = s[d + n * i] * u;
      while (--c);
    } while (i--);
    i = 2;
    do {
      o = 2;
      do {
        if (d = s[t + o + n * i], isNaN(d) || d === 1 / 0)
          throw `Could not reverse! A=[${this.toString()}]`;
        e.e(i, o, d);
      } while (o--);
    } while (i--);
    return e;
  }
  /**
   * Set the matrix from a quaterion
   */
  setRotationFromQuaternion(e) {
    const t = e.x, n = e.y, s = e.z, i = e.w, o = t + t, r = n + n, a = s + s, c = t * o, l = t * r, d = t * a, u = n * r, g = n * a, h = s * a, y = i * o, m = i * r, v = i * a, w = this.elements;
    return w[3 * 0 + 0] = 1 - (u + h), w[3 * 0 + 1] = l - v, w[3 * 0 + 2] = d + m, w[3 * 1 + 0] = l + v, w[3 * 1 + 1] = 1 - (c + h), w[3 * 1 + 2] = g - y, w[3 * 2 + 0] = d - m, w[3 * 2 + 1] = g + y, w[3 * 2 + 2] = 1 - (c + u), this;
  }
  /**
   * Transpose the matrix
   * @param target Optional. Where to store the result.
   * @return The target Mat3, or a new Mat3 if target was omitted.
   */
  transpose(e) {
    e === void 0 && (e = new ce());
    const t = this.elements, n = e.elements;
    let s;
    return n[0] = t[0], n[4] = t[4], n[8] = t[8], s = t[1], n[1] = t[3], n[3] = s, s = t[2], n[2] = t[6], n[6] = s, s = t[5], n[5] = t[7], n[7] = s, e;
  }
}
const Yi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
class p {
  constructor(e, t, n) {
    e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), this.x = e, this.y = t, this.z = n;
  }
  /**
   * Vector cross product
   * @param target Optional target to save in.
   */
  cross(e, t) {
    t === void 0 && (t = new p());
    const n = e.x, s = e.y, i = e.z, o = this.x, r = this.y, a = this.z;
    return t.x = r * i - a * s, t.y = a * n - o * i, t.z = o * s - r * n, t;
  }
  /**
   * Set the vectors' 3 elements
   */
  set(e, t, n) {
    return this.x = e, this.y = t, this.z = n, this;
  }
  /**
   * Set all components of the vector to zero.
   */
  setZero() {
    this.x = this.y = this.z = 0;
  }
  /**
   * Vector addition
   */
  vadd(e, t) {
    if (t)
      t.x = e.x + this.x, t.y = e.y + this.y, t.z = e.z + this.z;
    else
      return new p(this.x + e.x, this.y + e.y, this.z + e.z);
  }
  /**
   * Vector subtraction
   * @param target Optional target to save in.
   */
  vsub(e, t) {
    if (t)
      t.x = this.x - e.x, t.y = this.y - e.y, t.z = this.z - e.z;
    else
      return new p(this.x - e.x, this.y - e.y, this.z - e.z);
  }
  /**
   * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
   *
   * See {@link https://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf Umeå University Lecture}
   */
  crossmat() {
    return new ce([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0]);
  }
  /**
   * Normalize the vector. Note that this changes the values in the vector.
    * @return Returns the norm of the vector
   */
  normalize() {
    const e = this.x, t = this.y, n = this.z, s = Math.sqrt(e * e + t * t + n * n);
    if (s > 0) {
      const i = 1 / s;
      this.x *= i, this.y *= i, this.z *= i;
    } else
      this.x = 0, this.y = 0, this.z = 0;
    return s;
  }
  /**
   * Get the version of this vector that is of length 1.
   * @param target Optional target to save in
   * @return Returns the unit vector
   */
  unit(e) {
    e === void 0 && (e = new p());
    const t = this.x, n = this.y, s = this.z;
    let i = Math.sqrt(t * t + n * n + s * s);
    return i > 0 ? (i = 1 / i, e.x = t * i, e.y = n * i, e.z = s * i) : (e.x = 1, e.y = 0, e.z = 0), e;
  }
  /**
   * Get the length of the vector
   */
  length() {
    const e = this.x, t = this.y, n = this.z;
    return Math.sqrt(e * e + t * t + n * n);
  }
  /**
   * Get the squared length of the vector.
   */
  lengthSquared() {
    return this.dot(this);
  }
  /**
   * Get distance from this point to another point
   */
  distanceTo(e) {
    const t = this.x, n = this.y, s = this.z, i = e.x, o = e.y, r = e.z;
    return Math.sqrt((i - t) * (i - t) + (o - n) * (o - n) + (r - s) * (r - s));
  }
  /**
   * Get squared distance from this point to another point
   */
  distanceSquared(e) {
    const t = this.x, n = this.y, s = this.z, i = e.x, o = e.y, r = e.z;
    return (i - t) * (i - t) + (o - n) * (o - n) + (r - s) * (r - s);
  }
  /**
   * Multiply all the components of the vector with a scalar.
   * @param target The vector to save the result in.
   */
  scale(e, t) {
    t === void 0 && (t = new p());
    const n = this.x, s = this.y, i = this.z;
    return t.x = e * n, t.y = e * s, t.z = e * i, t;
  }
  /**
   * Multiply the vector with an other vector, component-wise.
   * @param target The vector to save the result in.
   */
  vmul(e, t) {
    return t === void 0 && (t = new p()), t.x = e.x * this.x, t.y = e.y * this.y, t.z = e.z * this.z, t;
  }
  /**
   * Scale a vector and add it to this vector. Save the result in "target". (target = this + vector * scalar)
   * @param target The vector to save the result in.
   */
  addScaledVector(e, t, n) {
    return n === void 0 && (n = new p()), n.x = this.x + e * t.x, n.y = this.y + e * t.y, n.z = this.z + e * t.z, n;
  }
  /**
   * Calculate dot product
   * @param vector
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  isZero() {
    return this.x === 0 && this.y === 0 && this.z === 0;
  }
  /**
   * Make the vector point in the opposite direction.
   * @param target Optional target to save in
   */
  negate(e) {
    return e === void 0 && (e = new p()), e.x = -this.x, e.y = -this.y, e.z = -this.z, e;
  }
  /**
   * Compute two artificial tangents to the vector
   * @param t1 Vector object to save the first tangent in
   * @param t2 Vector object to save the second tangent in
   */
  tangents(e, t) {
    const n = this.length();
    if (n > 0) {
      const s = $i, i = 1 / n;
      s.set(this.x * i, this.y * i, this.z * i);
      const o = Zi;
      Math.abs(s.x) < 0.9 ? (o.set(1, 0, 0), s.cross(o, e)) : (o.set(0, 1, 0), s.cross(o, e)), s.cross(e, t);
    } else
      e.set(1, 0, 0), t.set(0, 1, 0);
  }
  /**
   * Converts to a more readable format
   */
  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
  /**
   * Converts to an array
   */
  toArray() {
    return [this.x, this.y, this.z];
  }
  /**
   * Copies value of source to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Do a linear interpolation between two vectors
   * @param t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
   */
  lerp(e, t, n) {
    const s = this.x, i = this.y, o = this.z;
    n.x = s + (e.x - s) * t, n.y = i + (e.y - i) * t, n.z = o + (e.z - o) * t;
  }
  /**
   * Check if a vector equals is almost equal to another one.
   */
  almostEquals(e, t) {
    return t === void 0 && (t = 1e-6), !(Math.abs(this.x - e.x) > t || Math.abs(this.y - e.y) > t || Math.abs(this.z - e.z) > t);
  }
  /**
   * Check if a vector is almost zero
   */
  almostZero(e) {
    return e === void 0 && (e = 1e-6), !(Math.abs(this.x) > e || Math.abs(this.y) > e || Math.abs(this.z) > e);
  }
  /**
   * Check if the vector is anti-parallel to another vector.
   * @param precision Set to zero for exact comparisons
   */
  isAntiparallelTo(e, t) {
    return this.negate(Rn), Rn.almostEquals(e, t);
  }
  /**
   * Clone the vector
   */
  clone() {
    return new p(this.x, this.y, this.z);
  }
}
p.ZERO = new p(0, 0, 0);
p.UNIT_X = new p(1, 0, 0);
p.UNIT_Y = new p(0, 1, 0);
p.UNIT_Z = new p(0, 0, 1);
const $i = new p(), Zi = new p(), Rn = new p();
class ie {
  /**
   * The lower bound of the bounding box
   */
  /**
   * The upper bound of the bounding box
   */
  constructor(e) {
    e === void 0 && (e = {}), this.lowerBound = new p(), this.upperBound = new p(), e.lowerBound && this.lowerBound.copy(e.lowerBound), e.upperBound && this.upperBound.copy(e.upperBound);
  }
  /**
   * Set the AABB bounds from a set of points.
   * @param points An array of Vec3's.
   * @return The self object
   */
  setFromPoints(e, t, n, s) {
    const i = this.lowerBound, o = this.upperBound, r = n;
    i.copy(e[0]), r && r.vmult(i, i), o.copy(i);
    for (let a = 1; a < e.length; a++) {
      let c = e[a];
      r && (r.vmult(c, Mn), c = Mn), c.x > o.x && (o.x = c.x), c.x < i.x && (i.x = c.x), c.y > o.y && (o.y = c.y), c.y < i.y && (i.y = c.y), c.z > o.z && (o.z = c.z), c.z < i.z && (i.z = c.z);
    }
    return t && (t.vadd(i, i), t.vadd(o, o)), s && (i.x -= s, i.y -= s, i.z -= s, o.x += s, o.y += s, o.z += s), this;
  }
  /**
   * Copy bounds from an AABB to this AABB
   * @param aabb Source to copy from
   * @return The this object, for chainability
   */
  copy(e) {
    return this.lowerBound.copy(e.lowerBound), this.upperBound.copy(e.upperBound), this;
  }
  /**
   * Clone an AABB
   */
  clone() {
    return new ie().copy(this);
  }
  /**
   * Extend this AABB so that it covers the given AABB too.
   */
  extend(e) {
    this.lowerBound.x = Math.min(this.lowerBound.x, e.lowerBound.x), this.upperBound.x = Math.max(this.upperBound.x, e.upperBound.x), this.lowerBound.y = Math.min(this.lowerBound.y, e.lowerBound.y), this.upperBound.y = Math.max(this.upperBound.y, e.upperBound.y), this.lowerBound.z = Math.min(this.lowerBound.z, e.lowerBound.z), this.upperBound.z = Math.max(this.upperBound.z, e.upperBound.z);
  }
  /**
   * Returns true if the given AABB overlaps this AABB.
   */
  overlaps(e) {
    const t = this.lowerBound, n = this.upperBound, s = e.lowerBound, i = e.upperBound, o = s.x <= n.x && n.x <= i.x || t.x <= i.x && i.x <= n.x, r = s.y <= n.y && n.y <= i.y || t.y <= i.y && i.y <= n.y, a = s.z <= n.z && n.z <= i.z || t.z <= i.z && i.z <= n.z;
    return o && r && a;
  }
  // Mostly for debugging
  volume() {
    const e = this.lowerBound, t = this.upperBound;
    return (t.x - e.x) * (t.y - e.y) * (t.z - e.z);
  }
  /**
   * Returns true if the given AABB is fully contained in this AABB.
   */
  contains(e) {
    const t = this.lowerBound, n = this.upperBound, s = e.lowerBound, i = e.upperBound;
    return t.x <= s.x && n.x >= i.x && t.y <= s.y && n.y >= i.y && t.z <= s.z && n.z >= i.z;
  }
  getCorners(e, t, n, s, i, o, r, a) {
    const c = this.lowerBound, l = this.upperBound;
    e.copy(c), t.set(l.x, c.y, c.z), n.set(l.x, l.y, c.z), s.set(c.x, l.y, l.z), i.set(l.x, c.y, l.z), o.set(c.x, l.y, c.z), r.set(c.x, c.y, l.z), a.copy(l);
  }
  /**
   * Get the representation of an AABB in another frame.
   * @return The "target" AABB object.
   */
  toLocalFrame(e, t) {
    const n = Cn, s = n[0], i = n[1], o = n[2], r = n[3], a = n[4], c = n[5], l = n[6], d = n[7];
    this.getCorners(s, i, o, r, a, c, l, d);
    for (let u = 0; u !== 8; u++) {
      const g = n[u];
      e.pointToLocal(g, g);
    }
    return t.setFromPoints(n);
  }
  /**
   * Get the representation of an AABB in the global frame.
   * @return The "target" AABB object.
   */
  toWorldFrame(e, t) {
    const n = Cn, s = n[0], i = n[1], o = n[2], r = n[3], a = n[4], c = n[5], l = n[6], d = n[7];
    this.getCorners(s, i, o, r, a, c, l, d);
    for (let u = 0; u !== 8; u++) {
      const g = n[u];
      e.pointToWorld(g, g);
    }
    return t.setFromPoints(n);
  }
  /**
   * Check if the AABB is hit by a ray.
   */
  overlapsRay(e) {
    const {
      direction: t,
      from: n
    } = e, s = 1 / t.x, i = 1 / t.y, o = 1 / t.z, r = (this.lowerBound.x - n.x) * s, a = (this.upperBound.x - n.x) * s, c = (this.lowerBound.y - n.y) * i, l = (this.upperBound.y - n.y) * i, d = (this.lowerBound.z - n.z) * o, u = (this.upperBound.z - n.z) * o, g = Math.max(Math.max(Math.min(r, a), Math.min(c, l)), Math.min(d, u)), h = Math.min(Math.min(Math.max(r, a), Math.max(c, l)), Math.max(d, u));
    return !(h < 0 || g > h);
  }
}
const Mn = new p(), Cn = [new p(), new p(), new p(), new p(), new p(), new p(), new p(), new p()];
class Nn {
  /**
   * The matrix storage.
   */
  constructor() {
    this.matrix = [];
  }
  /**
   * Get an element
   */
  get(e, t) {
    let {
      index: n
    } = e, {
      index: s
    } = t;
    if (s > n) {
      const i = s;
      s = n, n = i;
    }
    return this.matrix[(n * (n + 1) >> 1) + s - 1];
  }
  /**
   * Set an element
   */
  set(e, t, n) {
    let {
      index: s
    } = e, {
      index: i
    } = t;
    if (i > s) {
      const o = i;
      i = s, s = o;
    }
    this.matrix[(s * (s + 1) >> 1) + i - 1] = n ? 1 : 0;
  }
  /**
   * Sets all elements to zero
   */
  reset() {
    for (let e = 0, t = this.matrix.length; e !== t; e++)
      this.matrix[e] = 0;
  }
  /**
   * Sets the max number of objects
   */
  setNumObjects(e) {
    this.matrix.length = e * (e - 1) >> 1;
  }
}
class As {
  /**
   * Add an event listener
   * @return The self object, for chainability.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    return n[e] === void 0 && (n[e] = []), n[e].includes(t) || n[e].push(t), this;
  }
  /**
   * Check if an event listener is added
   */
  hasEventListener(e, t) {
    if (this._listeners === void 0)
      return !1;
    const n = this._listeners;
    return !!(n[e] !== void 0 && n[e].includes(t));
  }
  /**
   * Check if any event listener of the given type is added
   */
  hasAnyEventListener(e) {
    return this._listeners === void 0 ? !1 : this._listeners[e] !== void 0;
  }
  /**
   * Remove an event listener
   * @return The self object, for chainability.
   */
  removeEventListener(e, t) {
    if (this._listeners === void 0)
      return this;
    const n = this._listeners;
    if (n[e] === void 0)
      return this;
    const s = n[e].indexOf(t);
    return s !== -1 && n[e].splice(s, 1), this;
  }
  /**
   * Emit an event.
   * @return The self object, for chainability.
   */
  dispatchEvent(e) {
    if (this._listeners === void 0)
      return this;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      for (let s = 0, i = n.length; s < i; s++)
        n[s].call(this, e);
    }
    return this;
  }
}
class Y {
  constructor(e, t, n, s) {
    e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0), s === void 0 && (s = 1), this.x = e, this.y = t, this.z = n, this.w = s;
  }
  /**
   * Set the value of the quaternion.
   */
  set(e, t, n, s) {
    return this.x = e, this.y = t, this.z = n, this.w = s, this;
  }
  /**
   * Convert to a readable format
   * @return "x,y,z,w"
   */
  toString() {
    return `${this.x},${this.y},${this.z},${this.w}`;
  }
  /**
   * Convert to an Array
   * @return [x, y, z, w]
   */
  toArray() {
    return [this.x, this.y, this.z, this.w];
  }
  /**
   * Set the quaternion components given an axis and an angle in radians.
   */
  setFromAxisAngle(e, t) {
    const n = Math.sin(t * 0.5);
    return this.x = e.x * n, this.y = e.y * n, this.z = e.z * n, this.w = Math.cos(t * 0.5), this;
  }
  /**
   * Converts the quaternion to [ axis, angle ] representation.
   * @param targetAxis A vector object to reuse for storing the axis.
   * @return An array, first element is the axis and the second is the angle in radians.
   */
  toAxisAngle(e) {
    e === void 0 && (e = new p()), this.normalize();
    const t = 2 * Math.acos(this.w), n = Math.sqrt(1 - this.w * this.w);
    return n < 1e-3 ? (e.x = this.x, e.y = this.y, e.z = this.z) : (e.x = this.x / n, e.y = this.y / n, e.z = this.z / n), [e, t];
  }
  /**
   * Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
   */
  setFromVectors(e, t) {
    if (e.isAntiparallelTo(t)) {
      const n = Qi, s = Ji;
      e.tangents(n, s), this.setFromAxisAngle(n, Math.PI);
    } else {
      const n = e.cross(t);
      this.x = n.x, this.y = n.y, this.z = n.z, this.w = Math.sqrt(e.length() ** 2 * t.length() ** 2) + e.dot(t), this.normalize();
    }
    return this;
  }
  /**
   * Multiply the quaternion with an other quaternion.
   */
  mult(e, t) {
    t === void 0 && (t = new Y());
    const n = this.x, s = this.y, i = this.z, o = this.w, r = e.x, a = e.y, c = e.z, l = e.w;
    return t.x = n * l + o * r + s * c - i * a, t.y = s * l + o * a + i * r - n * c, t.z = i * l + o * c + n * a - s * r, t.w = o * l - n * r - s * a - i * c, t;
  }
  /**
   * Get the inverse quaternion rotation.
   */
  inverse(e) {
    e === void 0 && (e = new Y());
    const t = this.x, n = this.y, s = this.z, i = this.w;
    this.conjugate(e);
    const o = 1 / (t * t + n * n + s * s + i * i);
    return e.x *= o, e.y *= o, e.z *= o, e.w *= o, e;
  }
  /**
   * Get the quaternion conjugate
   */
  conjugate(e) {
    return e === void 0 && (e = new Y()), e.x = -this.x, e.y = -this.y, e.z = -this.z, e.w = this.w, e;
  }
  /**
   * Normalize the quaternion. Note that this changes the values of the quaternion.
   */
  normalize() {
    let e = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    return e === 0 ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0) : (e = 1 / e, this.x *= e, this.y *= e, this.z *= e, this.w *= e), this;
  }
  /**
   * Approximation of quaternion normalization. Works best when quat is already almost-normalized.
   * @author unphased, https://github.com/unphased
   */
  normalizeFast() {
    const e = (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2;
    return e === 0 ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0) : (this.x *= e, this.y *= e, this.z *= e, this.w *= e), this;
  }
  /**
   * Multiply the quaternion by a vector
   */
  vmult(e, t) {
    t === void 0 && (t = new p());
    const n = e.x, s = e.y, i = e.z, o = this.x, r = this.y, a = this.z, c = this.w, l = c * n + r * i - a * s, d = c * s + a * n - o * i, u = c * i + o * s - r * n, g = -o * n - r * s - a * i;
    return t.x = l * c + g * -o + d * -a - u * -r, t.y = d * c + g * -r + u * -o - l * -a, t.z = u * c + g * -a + l * -r - d * -o, t;
  }
  /**
   * Copies value of source to this quaternion.
   * @return this
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w, this;
  }
  /**
   * Convert the quaternion to euler angle representation. Order: YZX, as this page describes: https://www.euclideanspace.com/maths/standards/index.htm
   * @param order Three-character string, defaults to "YZX"
   */
  toEuler(e, t) {
    t === void 0 && (t = "YZX");
    let n, s, i;
    const o = this.x, r = this.y, a = this.z, c = this.w;
    switch (t) {
      case "YZX":
        const l = o * r + a * c;
        if (l > 0.499 && (n = 2 * Math.atan2(o, c), s = Math.PI / 2, i = 0), l < -0.499 && (n = -2 * Math.atan2(o, c), s = -Math.PI / 2, i = 0), n === void 0) {
          const d = o * o, u = r * r, g = a * a;
          n = Math.atan2(2 * r * c - 2 * o * a, 1 - 2 * u - 2 * g), s = Math.asin(2 * l), i = Math.atan2(2 * o * c - 2 * r * a, 1 - 2 * d - 2 * g);
        }
        break;
      default:
        throw new Error(`Euler order ${t} not supported yet.`);
    }
    e.y = n, e.z = s, e.x = i;
  }
  /**
   * Set the quaternion components given Euler angle representation.
   *
   * @param order The order to apply angles: 'XYZ' or 'YXZ' or any other combination.
   *
   * See {@link https://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors MathWorks} reference
   */
  setFromEuler(e, t, n, s) {
    s === void 0 && (s = "XYZ");
    const i = Math.cos(e / 2), o = Math.cos(t / 2), r = Math.cos(n / 2), a = Math.sin(e / 2), c = Math.sin(t / 2), l = Math.sin(n / 2);
    return s === "XYZ" ? (this.x = a * o * r + i * c * l, this.y = i * c * r - a * o * l, this.z = i * o * l + a * c * r, this.w = i * o * r - a * c * l) : s === "YXZ" ? (this.x = a * o * r + i * c * l, this.y = i * c * r - a * o * l, this.z = i * o * l - a * c * r, this.w = i * o * r + a * c * l) : s === "ZXY" ? (this.x = a * o * r - i * c * l, this.y = i * c * r + a * o * l, this.z = i * o * l + a * c * r, this.w = i * o * r - a * c * l) : s === "ZYX" ? (this.x = a * o * r - i * c * l, this.y = i * c * r + a * o * l, this.z = i * o * l - a * c * r, this.w = i * o * r + a * c * l) : s === "YZX" ? (this.x = a * o * r + i * c * l, this.y = i * c * r + a * o * l, this.z = i * o * l - a * c * r, this.w = i * o * r - a * c * l) : s === "XZY" && (this.x = a * o * r - i * c * l, this.y = i * c * r - a * o * l, this.z = i * o * l + a * c * r, this.w = i * o * r + a * c * l), this;
  }
  clone() {
    return new Y(this.x, this.y, this.z, this.w);
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param toQuat second operand
   * @param t interpolation amount between the self quaternion and toQuat
   * @param target A quaternion to store the result in. If not provided, a new one will be created.
   * @returns {Quaternion} The "target" object
   */
  slerp(e, t, n) {
    n === void 0 && (n = new Y());
    const s = this.x, i = this.y, o = this.z, r = this.w;
    let a = e.x, c = e.y, l = e.z, d = e.w, u, g, h, y, m;
    return g = s * a + i * c + o * l + r * d, g < 0 && (g = -g, a = -a, c = -c, l = -l, d = -d), 1 - g > 1e-6 ? (u = Math.acos(g), h = Math.sin(u), y = Math.sin((1 - t) * u) / h, m = Math.sin(t * u) / h) : (y = 1 - t, m = t), n.x = y * s + m * a, n.y = y * i + m * c, n.z = y * o + m * l, n.w = y * r + m * d, n;
  }
  /**
   * Rotate an absolute orientation quaternion given an angular velocity and a time step.
   */
  integrate(e, t, n, s) {
    s === void 0 && (s = new Y());
    const i = e.x * n.x, o = e.y * n.y, r = e.z * n.z, a = this.x, c = this.y, l = this.z, d = this.w, u = t * 0.5;
    return s.x += u * (i * d + o * l - r * c), s.y += u * (o * d + r * a - i * l), s.z += u * (r * d + i * c - o * a), s.w += u * (-i * a - o * c - r * l), s;
  }
}
const Qi = new p(), Ji = new p(), eo = {
  /** SPHERE */
  SPHERE: 1,
  /** PLANE */
  PLANE: 2,
  /** BOX */
  BOX: 4,
  /** COMPOUND */
  COMPOUND: 8,
  /** CONVEXPOLYHEDRON */
  CONVEXPOLYHEDRON: 16,
  /** HEIGHTFIELD */
  HEIGHTFIELD: 32,
  /** PARTICLE */
  PARTICLE: 64,
  /** CYLINDER */
  CYLINDER: 128,
  /** TRIMESH */
  TRIMESH: 256
};
class F {
  /**
   * Identifier of the Shape.
   */
  /**
   * The type of this shape. Must be set to an int > 0 by subclasses.
   */
  /**
   * The local bounding sphere radius of this shape.
   */
  /**
   * Whether to produce contact forces when in contact with other bodies. Note that contacts will be generated, but they will be disabled.
   * @default true
   */
  /**
   * @default 1
   */
  /**
   * @default -1
   */
  /**
   * Optional material of the shape that regulates contact properties.
   */
  /**
   * The body to which the shape is added to.
   */
  /**
   * All the Shape types.
   */
  constructor(e) {
    e === void 0 && (e = {}), this.id = F.idCounter++, this.type = e.type || 0, this.boundingSphereRadius = 0, this.collisionResponse = e.collisionResponse ? e.collisionResponse : !0, this.collisionFilterGroup = e.collisionFilterGroup !== void 0 ? e.collisionFilterGroup : 1, this.collisionFilterMask = e.collisionFilterMask !== void 0 ? e.collisionFilterMask : -1, this.material = e.material ? e.material : null, this.body = null;
  }
  /**
   * Computes the bounding sphere radius.
   * The result is stored in the property `.boundingSphereRadius`
   */
  updateBoundingSphereRadius() {
    throw `computeBoundingSphereRadius() not implemented for shape type ${this.type}`;
  }
  /**
   * Get the volume of this shape
   */
  volume() {
    throw `volume() not implemented for shape type ${this.type}`;
  }
  /**
   * Calculates the inertia in the local frame for this shape.
   * @see http://en.wikipedia.org/wiki/List_of_moments_of_inertia
   */
  calculateLocalInertia(e, t) {
    throw `calculateLocalInertia() not implemented for shape type ${this.type}`;
  }
  /**
   * @todo use abstract for these kind of methods
   */
  calculateWorldAABB(e, t, n, s) {
    throw `calculateWorldAABB() not implemented for shape type ${this.type}`;
  }
}
F.idCounter = 0;
F.types = eo;
class G {
  /**
   * position
   */
  /**
   * quaternion
   */
  constructor(e) {
    e === void 0 && (e = {}), this.position = new p(), this.quaternion = new Y(), e.position && this.position.copy(e.position), e.quaternion && this.quaternion.copy(e.quaternion);
  }
  /**
   * Get a global point in local transform coordinates.
   */
  pointToLocal(e, t) {
    return G.pointToLocalFrame(this.position, this.quaternion, e, t);
  }
  /**
   * Get a local point in global transform coordinates.
   */
  pointToWorld(e, t) {
    return G.pointToWorldFrame(this.position, this.quaternion, e, t);
  }
  /**
   * vectorToWorldFrame
   */
  vectorToWorldFrame(e, t) {
    return t === void 0 && (t = new p()), this.quaternion.vmult(e, t), t;
  }
  /**
   * pointToLocalFrame
   */
  static pointToLocalFrame(e, t, n, s) {
    return s === void 0 && (s = new p()), n.vsub(e, s), t.conjugate(Pn), Pn.vmult(s, s), s;
  }
  /**
   * pointToWorldFrame
   */
  static pointToWorldFrame(e, t, n, s) {
    return s === void 0 && (s = new p()), t.vmult(n, s), s.vadd(e, s), s;
  }
  /**
   * vectorToWorldFrame
   */
  static vectorToWorldFrame(e, t, n) {
    return n === void 0 && (n = new p()), e.vmult(t, n), n;
  }
  /**
   * vectorToLocalFrame
   */
  static vectorToLocalFrame(e, t, n, s) {
    return s === void 0 && (s = new p()), t.w *= -1, t.vmult(n, s), t.w *= -1, s;
  }
}
const Pn = new Y();
class st extends F {
  /** vertices */
  /**
   * Array of integer arrays, indicating which vertices each face consists of
   */
  /** faceNormals */
  /** worldVertices */
  /** worldVerticesNeedsUpdate */
  /** worldFaceNormals */
  /** worldFaceNormalsNeedsUpdate */
  /**
   * If given, these locally defined, normalized axes are the only ones being checked when doing separating axis check.
   */
  /** uniqueEdges */
  /**
   * @param vertices An array of Vec3's
   * @param faces Array of integer arrays, describing which vertices that is included in each face.
   */
  constructor(e) {
    e === void 0 && (e = {});
    const {
      vertices: t = [],
      faces: n = [],
      normals: s = [],
      axes: i,
      boundingSphereRadius: o
    } = e;
    super({
      type: F.types.CONVEXPOLYHEDRON
    }), this.vertices = t, this.faces = n, this.faceNormals = s, this.faceNormals.length === 0 && this.computeNormals(), o ? this.boundingSphereRadius = o : this.updateBoundingSphereRadius(), this.worldVertices = [], this.worldVerticesNeedsUpdate = !0, this.worldFaceNormals = [], this.worldFaceNormalsNeedsUpdate = !0, this.uniqueAxes = i ? i.slice() : null, this.uniqueEdges = [], this.computeEdges();
  }
  /**
   * Computes uniqueEdges
   */
  computeEdges() {
    const e = this.faces, t = this.vertices, n = this.uniqueEdges;
    n.length = 0;
    const s = new p();
    for (let i = 0; i !== e.length; i++) {
      const o = e[i], r = o.length;
      for (let a = 0; a !== r; a++) {
        const c = (a + 1) % r;
        t[o[a]].vsub(t[o[c]], s), s.normalize();
        let l = !1;
        for (let d = 0; d !== n.length; d++)
          if (n[d].almostEquals(s) || n[d].almostEquals(s)) {
            l = !0;
            break;
          }
        l || n.push(s.clone());
      }
    }
  }
  /**
   * Compute the normals of the faces.
   * Will reuse existing Vec3 objects in the `faceNormals` array if they exist.
   */
  computeNormals() {
    this.faceNormals.length = this.faces.length;
    for (let e = 0; e < this.faces.length; e++) {
      for (let s = 0; s < this.faces[e].length; s++)
        if (!this.vertices[this.faces[e][s]])
          throw new Error(`Vertex ${this.faces[e][s]} not found!`);
      const t = this.faceNormals[e] || new p();
      this.getFaceNormal(e, t), t.negate(t), this.faceNormals[e] = t;
      const n = this.vertices[this.faces[e][0]];
      if (t.dot(n) < 0) {
        console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);
        for (let s = 0; s < this.faces[e].length; s++)
          console.warn(`.vertices[${this.faces[e][s]}] = Vec3(${this.vertices[this.faces[e][s]].toString()})`);
      }
    }
  }
  /**
   * Compute the normal of a face from its vertices
   */
  getFaceNormal(e, t) {
    const n = this.faces[e], s = this.vertices[n[0]], i = this.vertices[n[1]], o = this.vertices[n[2]];
    st.computeNormal(s, i, o, t);
  }
  /**
   * Get face normal given 3 vertices
   */
  static computeNormal(e, t, n, s) {
    const i = new p(), o = new p();
    t.vsub(e, o), n.vsub(t, i), i.cross(o, s), s.isZero() || s.normalize();
  }
  /**
   * @param minDist Clamp distance
   * @param result The an array of contact point objects, see clipFaceAgainstHull
   */
  clipAgainstHull(e, t, n, s, i, o, r, a, c) {
    const l = new p();
    let d = -1, u = -Number.MAX_VALUE;
    for (let h = 0; h < n.faces.length; h++) {
      l.copy(n.faceNormals[h]), i.vmult(l, l);
      const y = l.dot(o);
      y > u && (u = y, d = h);
    }
    const g = [];
    for (let h = 0; h < n.faces[d].length; h++) {
      const y = n.vertices[n.faces[d][h]], m = new p();
      m.copy(y), i.vmult(m, m), s.vadd(m, m), g.push(m);
    }
    d >= 0 && this.clipFaceAgainstHull(o, e, t, g, r, a, c);
  }
  /**
   * Find the separating axis between this hull and another
   * @param target The target vector to save the axis in
   * @return Returns false if a separation is found, else true
   */
  findSeparatingAxis(e, t, n, s, i, o, r, a) {
    const c = new p(), l = new p(), d = new p(), u = new p(), g = new p(), h = new p();
    let y = Number.MAX_VALUE;
    const m = this;
    if (m.uniqueAxes)
      for (let v = 0; v !== m.uniqueAxes.length; v++) {
        n.vmult(m.uniqueAxes[v], c);
        const w = m.testSepAxis(c, e, t, n, s, i);
        if (w === !1)
          return !1;
        w < y && (y = w, o.copy(c));
      }
    else {
      const v = r ? r.length : m.faces.length;
      for (let w = 0; w < v; w++) {
        const x = r ? r[w] : w;
        c.copy(m.faceNormals[x]), n.vmult(c, c);
        const A = m.testSepAxis(c, e, t, n, s, i);
        if (A === !1)
          return !1;
        A < y && (y = A, o.copy(c));
      }
    }
    if (e.uniqueAxes)
      for (let v = 0; v !== e.uniqueAxes.length; v++) {
        i.vmult(e.uniqueAxes[v], l);
        const w = m.testSepAxis(l, e, t, n, s, i);
        if (w === !1)
          return !1;
        w < y && (y = w, o.copy(l));
      }
    else {
      const v = a ? a.length : e.faces.length;
      for (let w = 0; w < v; w++) {
        const x = a ? a[w] : w;
        l.copy(e.faceNormals[x]), i.vmult(l, l);
        const A = m.testSepAxis(l, e, t, n, s, i);
        if (A === !1)
          return !1;
        A < y && (y = A, o.copy(l));
      }
    }
    for (let v = 0; v !== m.uniqueEdges.length; v++) {
      n.vmult(m.uniqueEdges[v], u);
      for (let w = 0; w !== e.uniqueEdges.length; w++)
        if (i.vmult(e.uniqueEdges[w], g), u.cross(g, h), !h.almostZero()) {
          h.normalize();
          const x = m.testSepAxis(h, e, t, n, s, i);
          if (x === !1)
            return !1;
          x < y && (y = x, o.copy(h));
        }
    }
    return s.vsub(t, d), d.dot(o) > 0 && o.negate(o), !0;
  }
  /**
   * Test separating axis against two hulls. Both hulls are projected onto the axis and the overlap size is returned if there is one.
   * @return The overlap depth, or FALSE if no penetration.
   */
  testSepAxis(e, t, n, s, i, o) {
    const r = this;
    st.project(r, e, n, s, Ft), st.project(t, e, i, o, zt);
    const a = Ft[0], c = Ft[1], l = zt[0], d = zt[1];
    if (a < d || l < c)
      return !1;
    const u = a - d, g = l - c;
    return u < g ? u : g;
  }
  /**
   * calculateLocalInertia
   */
  calculateLocalInertia(e, t) {
    const n = new p(), s = new p();
    this.computeLocalAABB(s, n);
    const i = n.x - s.x, o = n.y - s.y, r = n.z - s.z;
    t.x = 1 / 12 * e * (2 * o * 2 * o + 2 * r * 2 * r), t.y = 1 / 12 * e * (2 * i * 2 * i + 2 * r * 2 * r), t.z = 1 / 12 * e * (2 * o * 2 * o + 2 * i * 2 * i);
  }
  /**
   * @param face_i Index of the face
   */
  getPlaneConstantOfFace(e) {
    const t = this.faces[e], n = this.faceNormals[e], s = this.vertices[t[0]];
    return -n.dot(s);
  }
  /**
   * Clip a face against a hull.
   * @param worldVertsB1 An array of Vec3 with vertices in the world frame.
   * @param minDist Distance clamping
   * @param Array result Array to store resulting contact points in. Will be objects with properties: point, depth, normal. These are represented in world coordinates.
   */
  clipFaceAgainstHull(e, t, n, s, i, o, r) {
    const a = new p(), c = new p(), l = new p(), d = new p(), u = new p(), g = new p(), h = new p(), y = new p(), m = this, v = [], w = s, x = v;
    let A = -1, T = Number.MAX_VALUE;
    for (let P = 0; P < m.faces.length; P++) {
      a.copy(m.faceNormals[P]), n.vmult(a, a);
      const O = a.dot(e);
      O < T && (T = O, A = P);
    }
    if (A < 0)
      return;
    const S = m.faces[A];
    S.connectedFaces = [];
    for (let P = 0; P < m.faces.length; P++)
      for (let O = 0; O < m.faces[P].length; O++)
        /* Sharing a vertex*/
        S.indexOf(m.faces[P][O]) !== -1 && /* Not the one we are looking for connections from */
        P !== A && /* Not already added */
        S.connectedFaces.indexOf(P) === -1 && S.connectedFaces.push(P);
    const N = S.length;
    for (let P = 0; P < N; P++) {
      const O = m.vertices[S[P]], L = m.vertices[S[(P + 1) % N]];
      O.vsub(L, c), l.copy(c), n.vmult(l, l), t.vadd(l, l), d.copy(this.faceNormals[A]), n.vmult(d, d), t.vadd(d, d), l.cross(d, u), u.negate(u), g.copy(O), n.vmult(g, g), t.vadd(g, g);
      const E = S.connectedFaces[P];
      h.copy(this.faceNormals[E]);
      const I = this.getPlaneConstantOfFace(E);
      y.copy(h), n.vmult(y, y);
      const C = I - y.dot(t);
      for (this.clipFaceAgainstPlane(w, x, y, C); w.length; )
        w.shift();
      for (; x.length; )
        w.push(x.shift());
    }
    h.copy(this.faceNormals[A]);
    const R = this.getPlaneConstantOfFace(A);
    y.copy(h), n.vmult(y, y);
    const M = R - y.dot(t);
    for (let P = 0; P < w.length; P++) {
      let O = y.dot(w[P]) + M;
      if (O <= i && (console.log(`clamped: depth=${O} to minDist=${i}`), O = i), O <= o) {
        const L = w[P];
        if (O <= 1e-6) {
          const E = {
            point: L,
            normal: y,
            depth: O
          };
          r.push(E);
        }
      }
    }
  }
  /**
   * Clip a face in a hull against the back of a plane.
   * @param planeConstant The constant in the mathematical plane equation
   */
  clipFaceAgainstPlane(e, t, n, s) {
    let i, o;
    const r = e.length;
    if (r < 2)
      return t;
    let a = e[e.length - 1], c = e[0];
    i = n.dot(a) + s;
    for (let l = 0; l < r; l++) {
      if (c = e[l], o = n.dot(c) + s, i < 0)
        if (o < 0) {
          const d = new p();
          d.copy(c), t.push(d);
        } else {
          const d = new p();
          a.lerp(c, i / (i - o), d), t.push(d);
        }
      else if (o < 0) {
        const d = new p();
        a.lerp(c, i / (i - o), d), t.push(d), t.push(c);
      }
      a = c, i = o;
    }
    return t;
  }
  /**
   * Updates `.worldVertices` and sets `.worldVerticesNeedsUpdate` to false.
   */
  computeWorldVertices(e, t) {
    for (; this.worldVertices.length < this.vertices.length; )
      this.worldVertices.push(new p());
    const n = this.vertices, s = this.worldVertices;
    for (let i = 0; i !== this.vertices.length; i++)
      t.vmult(n[i], s[i]), e.vadd(s[i], s[i]);
    this.worldVerticesNeedsUpdate = !1;
  }
  computeLocalAABB(e, t) {
    const n = this.vertices;
    e.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), t.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
    for (let s = 0; s < this.vertices.length; s++) {
      const i = n[s];
      i.x < e.x ? e.x = i.x : i.x > t.x && (t.x = i.x), i.y < e.y ? e.y = i.y : i.y > t.y && (t.y = i.y), i.z < e.z ? e.z = i.z : i.z > t.z && (t.z = i.z);
    }
  }
  /**
   * Updates `worldVertices` and sets `worldVerticesNeedsUpdate` to false.
   */
  computeWorldFaceNormals(e) {
    const t = this.faceNormals.length;
    for (; this.worldFaceNormals.length < t; )
      this.worldFaceNormals.push(new p());
    const n = this.faceNormals, s = this.worldFaceNormals;
    for (let i = 0; i !== t; i++)
      e.vmult(n[i], s[i]);
    this.worldFaceNormalsNeedsUpdate = !1;
  }
  /**
   * updateBoundingSphereRadius
   */
  updateBoundingSphereRadius() {
    let e = 0;
    const t = this.vertices;
    for (let n = 0; n !== t.length; n++) {
      const s = t[n].lengthSquared();
      s > e && (e = s);
    }
    this.boundingSphereRadius = Math.sqrt(e);
  }
  /**
   * calculateWorldAABB
   */
  calculateWorldAABB(e, t, n, s) {
    const i = this.vertices;
    let o, r, a, c, l, d, u = new p();
    for (let g = 0; g < i.length; g++) {
      u.copy(i[g]), t.vmult(u, u), e.vadd(u, u);
      const h = u;
      (o === void 0 || h.x < o) && (o = h.x), (c === void 0 || h.x > c) && (c = h.x), (r === void 0 || h.y < r) && (r = h.y), (l === void 0 || h.y > l) && (l = h.y), (a === void 0 || h.z < a) && (a = h.z), (d === void 0 || h.z > d) && (d = h.z);
    }
    n.set(o, r, a), s.set(c, l, d);
  }
  /**
   * Get approximate convex volume
   */
  volume() {
    return 4 * Math.PI * this.boundingSphereRadius / 3;
  }
  /**
   * Get an average of all the vertices positions
   */
  getAveragePointLocal(e) {
    e === void 0 && (e = new p());
    const t = this.vertices;
    for (let n = 0; n < t.length; n++)
      e.vadd(t[n], e);
    return e.scale(1 / t.length, e), e;
  }
  /**
   * Transform all local points. Will change the .vertices
   */
  transformAllPoints(e, t) {
    const n = this.vertices.length, s = this.vertices;
    if (t) {
      for (let i = 0; i < n; i++) {
        const o = s[i];
        t.vmult(o, o);
      }
      for (let i = 0; i < this.faceNormals.length; i++) {
        const o = this.faceNormals[i];
        t.vmult(o, o);
      }
    }
    if (e)
      for (let i = 0; i < n; i++) {
        const o = s[i];
        o.vadd(e, o);
      }
  }
  /**
   * Checks whether p is inside the polyhedra. Must be in local coords.
   * The point lies outside of the convex hull of the other points if and only if the direction
   * of all the vectors from it to those other points are on less than one half of a sphere around it.
   * @param p A point given in local coordinates
   */
  pointIsInside(e) {
    const t = this.vertices, n = this.faces, s = this.faceNormals, i = null, o = new p();
    this.getAveragePointLocal(o);
    for (let r = 0; r < this.faces.length; r++) {
      let a = s[r];
      const c = t[n[r][0]], l = new p();
      e.vsub(c, l);
      const d = a.dot(l), u = new p();
      o.vsub(c, u);
      const g = a.dot(u);
      if (d < 0 && g > 0 || d > 0 && g < 0)
        return !1;
    }
    return i ? 1 : -1;
  }
  /**
   * Get max and min dot product of a convex hull at position (pos,quat) projected onto an axis.
   * Results are saved in the array maxmin.
   * @param result result[0] and result[1] will be set to maximum and minimum, respectively.
   */
  static project(e, t, n, s, i) {
    const o = e.vertices.length, r = to;
    let a = 0, c = 0;
    const l = no, d = e.vertices;
    l.setZero(), G.vectorToLocalFrame(n, s, t, r), G.pointToLocalFrame(n, s, l, l);
    const u = l.dot(r);
    c = a = d[0].dot(r);
    for (let g = 1; g < o; g++) {
      const h = d[g].dot(r);
      h > a && (a = h), h < c && (c = h);
    }
    if (c -= u, a -= u, c > a) {
      const g = c;
      c = a, a = g;
    }
    i[0] = a, i[1] = c;
  }
}
const Ft = [], zt = [];
new p();
const to = new p(), no = new p();
class en extends F {
  /**
   * The half extents of the box.
   */
  /**
   * Used by the contact generator to make contacts with other convex polyhedra for example.
   */
  constructor(e) {
    super({
      type: F.types.BOX
    }), this.halfExtents = e, this.convexPolyhedronRepresentation = null, this.updateConvexPolyhedronRepresentation(), this.updateBoundingSphereRadius();
  }
  /**
   * Updates the local convex polyhedron representation used for some collisions.
   */
  updateConvexPolyhedronRepresentation() {
    const e = this.halfExtents.x, t = this.halfExtents.y, n = this.halfExtents.z, s = p, i = [new s(-e, -t, -n), new s(e, -t, -n), new s(e, t, -n), new s(-e, t, -n), new s(-e, -t, n), new s(e, -t, n), new s(e, t, n), new s(-e, t, n)], o = [
      [3, 2, 1, 0],
      // -z
      [4, 5, 6, 7],
      // +z
      [5, 4, 0, 1],
      // -y
      [2, 3, 7, 6],
      // +y
      [0, 4, 7, 3],
      // -x
      [1, 2, 6, 5]
      // +x
    ], r = [new s(0, 0, 1), new s(0, 1, 0), new s(1, 0, 0)], a = new st({
      vertices: i,
      faces: o,
      axes: r
    });
    this.convexPolyhedronRepresentation = a, a.material = this.material;
  }
  /**
   * Calculate the inertia of the box.
   */
  calculateLocalInertia(e, t) {
    return t === void 0 && (t = new p()), en.calculateInertia(this.halfExtents, e, t), t;
  }
  static calculateInertia(e, t, n) {
    const s = e;
    n.x = 1 / 12 * t * (2 * s.y * 2 * s.y + 2 * s.z * 2 * s.z), n.y = 1 / 12 * t * (2 * s.x * 2 * s.x + 2 * s.z * 2 * s.z), n.z = 1 / 12 * t * (2 * s.y * 2 * s.y + 2 * s.x * 2 * s.x);
  }
  /**
   * Get the box 6 side normals
   * @param sixTargetVectors An array of 6 vectors, to store the resulting side normals in.
   * @param quat Orientation to apply to the normal vectors. If not provided, the vectors will be in respect to the local frame.
   */
  getSideNormals(e, t) {
    const n = e, s = this.halfExtents;
    if (n[0].set(s.x, 0, 0), n[1].set(0, s.y, 0), n[2].set(0, 0, s.z), n[3].set(-s.x, 0, 0), n[4].set(0, -s.y, 0), n[5].set(0, 0, -s.z), t !== void 0)
      for (let i = 0; i !== n.length; i++)
        t.vmult(n[i], n[i]);
    return n;
  }
  /**
   * Returns the volume of the box.
   */
  volume() {
    return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
  }
  /**
   * updateBoundingSphereRadius
   */
  updateBoundingSphereRadius() {
    this.boundingSphereRadius = this.halfExtents.length();
  }
  /**
   * forEachWorldCorner
   */
  forEachWorldCorner(e, t, n) {
    const s = this.halfExtents, i = [[s.x, s.y, s.z], [-s.x, s.y, s.z], [-s.x, -s.y, s.z], [-s.x, -s.y, -s.z], [s.x, -s.y, -s.z], [s.x, s.y, -s.z], [-s.x, s.y, -s.z], [s.x, -s.y, s.z]];
    for (let o = 0; o < i.length; o++)
      Ee.set(i[o][0], i[o][1], i[o][2]), t.vmult(Ee, Ee), e.vadd(Ee, Ee), n(Ee.x, Ee.y, Ee.z);
  }
  /**
   * calculateWorldAABB
   */
  calculateWorldAABB(e, t, n, s) {
    const i = this.halfExtents;
    le[0].set(i.x, i.y, i.z), le[1].set(-i.x, i.y, i.z), le[2].set(-i.x, -i.y, i.z), le[3].set(-i.x, -i.y, -i.z), le[4].set(i.x, -i.y, -i.z), le[5].set(i.x, i.y, -i.z), le[6].set(-i.x, i.y, -i.z), le[7].set(i.x, -i.y, i.z);
    const o = le[0];
    t.vmult(o, o), e.vadd(o, o), s.copy(o), n.copy(o);
    for (let r = 1; r < 8; r++) {
      const a = le[r];
      t.vmult(a, a), e.vadd(a, a);
      const c = a.x, l = a.y, d = a.z;
      c > s.x && (s.x = c), l > s.y && (s.y = l), d > s.z && (s.z = d), c < n.x && (n.x = c), l < n.y && (n.y = l), d < n.z && (n.z = d);
    }
  }
}
const Ee = new p(), le = [new p(), new p(), new p(), new p(), new p(), new p(), new p(), new p()], tn = {
  /** DYNAMIC */
  DYNAMIC: 1,
  /** STATIC */
  STATIC: 2,
  /** KINEMATIC */
  KINEMATIC: 4
}, nn = {
  /** AWAKE */
  AWAKE: 0,
  /** SLEEPY */
  SLEEPY: 1,
  /** SLEEPING */
  SLEEPING: 2
};
class z extends As {
  /**
   * Dispatched after two bodies collide. This event is dispatched on each
   * of the two bodies involved in the collision.
   * @event collide
   * @param body The body that was involved in the collision.
   * @param contact The details of the collision.
   */
  /**
   * A dynamic body is fully simulated. Can be moved manually by the user, but normally they move according to forces. A dynamic body can collide with all body types. A dynamic body always has finite, non-zero mass.
   */
  /**
   * A static body does not move during simulation and behaves as if it has infinite mass. Static bodies can be moved manually by setting the position of the body. The velocity of a static body is always zero. Static bodies do not collide with other static or kinematic bodies.
   */
  /**
   * A kinematic body moves under simulation according to its velocity. They do not respond to forces. They can be moved manually, but normally a kinematic body is moved by setting its velocity. A kinematic body behaves as if it has infinite mass. Kinematic bodies do not collide with other static or kinematic bodies.
   */
  /**
   * AWAKE
   */
  /**
   * SLEEPY
   */
  /**
   * SLEEPING
   */
  /**
   * Dispatched after a sleeping body has woken up.
   * @event wakeup
   */
  /**
   * Dispatched after a body has gone in to the sleepy state.
   * @event sleepy
   */
  /**
   * Dispatched after a body has fallen asleep.
   * @event sleep
   */
  constructor(e) {
    e === void 0 && (e = {}), super(), this.id = z.idCounter++, this.index = -1, this.world = null, this.vlambda = new p(), this.collisionFilterGroup = typeof e.collisionFilterGroup == "number" ? e.collisionFilterGroup : 1, this.collisionFilterMask = typeof e.collisionFilterMask == "number" ? e.collisionFilterMask : -1, this.collisionResponse = typeof e.collisionResponse == "boolean" ? e.collisionResponse : !0, this.position = new p(), this.previousPosition = new p(), this.interpolatedPosition = new p(), this.initPosition = new p(), e.position && (this.position.copy(e.position), this.previousPosition.copy(e.position), this.interpolatedPosition.copy(e.position), this.initPosition.copy(e.position)), this.velocity = new p(), e.velocity && this.velocity.copy(e.velocity), this.initVelocity = new p(), this.force = new p();
    const t = typeof e.mass == "number" ? e.mass : 0;
    this.mass = t, this.invMass = t > 0 ? 1 / t : 0, this.material = e.material || null, this.linearDamping = typeof e.linearDamping == "number" ? e.linearDamping : 0.01, this.type = t <= 0 ? z.STATIC : z.DYNAMIC, typeof e.type == typeof z.STATIC && (this.type = e.type), this.allowSleep = typeof e.allowSleep < "u" ? e.allowSleep : !0, this.sleepState = z.AWAKE, this.sleepSpeedLimit = typeof e.sleepSpeedLimit < "u" ? e.sleepSpeedLimit : 0.1, this.sleepTimeLimit = typeof e.sleepTimeLimit < "u" ? e.sleepTimeLimit : 1, this.timeLastSleepy = 0, this.wakeUpAfterNarrowphase = !1, this.torque = new p(), this.quaternion = new Y(), this.initQuaternion = new Y(), this.previousQuaternion = new Y(), this.interpolatedQuaternion = new Y(), e.quaternion && (this.quaternion.copy(e.quaternion), this.initQuaternion.copy(e.quaternion), this.previousQuaternion.copy(e.quaternion), this.interpolatedQuaternion.copy(e.quaternion)), this.angularVelocity = new p(), e.angularVelocity && this.angularVelocity.copy(e.angularVelocity), this.initAngularVelocity = new p(), this.shapes = [], this.shapeOffsets = [], this.shapeOrientations = [], this.inertia = new p(), this.invInertia = new p(), this.invInertiaWorld = new ce(), this.invMassSolve = 0, this.invInertiaSolve = new p(), this.invInertiaWorldSolve = new ce(), this.fixedRotation = typeof e.fixedRotation < "u" ? e.fixedRotation : !1, this.angularDamping = typeof e.angularDamping < "u" ? e.angularDamping : 0.01, this.linearFactor = new p(1, 1, 1), e.linearFactor && this.linearFactor.copy(e.linearFactor), this.angularFactor = new p(1, 1, 1), e.angularFactor && this.angularFactor.copy(e.angularFactor), this.aabb = new ie(), this.aabbNeedsUpdate = !0, this.boundingRadius = 0, this.wlambda = new p(), this.isTrigger = !!e.isTrigger, e.shape && this.addShape(e.shape), this.updateMassProperties();
  }
  /**
   * Wake the body up.
   */
  wakeUp() {
    const e = this.sleepState;
    this.sleepState = z.AWAKE, this.wakeUpAfterNarrowphase = !1, e === z.SLEEPING && this.dispatchEvent(z.wakeupEvent);
  }
  /**
   * Force body sleep
   */
  sleep() {
    this.sleepState = z.SLEEPING, this.velocity.set(0, 0, 0), this.angularVelocity.set(0, 0, 0), this.wakeUpAfterNarrowphase = !1;
  }
  /**
   * Called every timestep to update internal sleep timer and change sleep state if needed.
   * @param time The world time in seconds
   */
  sleepTick(e) {
    if (this.allowSleep) {
      const t = this.sleepState, n = this.velocity.lengthSquared() + this.angularVelocity.lengthSquared(), s = this.sleepSpeedLimit ** 2;
      t === z.AWAKE && n < s ? (this.sleepState = z.SLEEPY, this.timeLastSleepy = e, this.dispatchEvent(z.sleepyEvent)) : t === z.SLEEPY && n > s ? this.wakeUp() : t === z.SLEEPY && e - this.timeLastSleepy > this.sleepTimeLimit && (this.sleep(), this.dispatchEvent(z.sleepEvent));
    }
  }
  /**
   * If the body is sleeping, it should be immovable / have infinite mass during solve. We solve it by having a separate "solve mass".
   */
  updateSolveMassProperties() {
    this.sleepState === z.SLEEPING || this.type === z.KINEMATIC ? (this.invMassSolve = 0, this.invInertiaSolve.setZero(), this.invInertiaWorldSolve.setZero()) : (this.invMassSolve = this.invMass, this.invInertiaSolve.copy(this.invInertia), this.invInertiaWorldSolve.copy(this.invInertiaWorld));
  }
  /**
   * Convert a world point to local body frame.
   */
  pointToLocalFrame(e, t) {
    return t === void 0 && (t = new p()), e.vsub(this.position, t), this.quaternion.conjugate().vmult(t, t), t;
  }
  /**
   * Convert a world vector to local body frame.
   */
  vectorToLocalFrame(e, t) {
    return t === void 0 && (t = new p()), this.quaternion.conjugate().vmult(e, t), t;
  }
  /**
   * Convert a local body point to world frame.
   */
  pointToWorldFrame(e, t) {
    return t === void 0 && (t = new p()), this.quaternion.vmult(e, t), t.vadd(this.position, t), t;
  }
  /**
   * Convert a local body point to world frame.
   */
  vectorToWorldFrame(e, t) {
    return t === void 0 && (t = new p()), this.quaternion.vmult(e, t), t;
  }
  /**
   * Add a shape to the body with a local offset and orientation.
   * @return The body object, for chainability.
   */
  addShape(e, t, n) {
    const s = new p(), i = new Y();
    return t && s.copy(t), n && i.copy(n), this.shapes.push(e), this.shapeOffsets.push(s), this.shapeOrientations.push(i), this.updateMassProperties(), this.updateBoundingRadius(), this.aabbNeedsUpdate = !0, e.body = this, this;
  }
  /**
   * Remove a shape from the body.
   * @return The body object, for chainability.
   */
  removeShape(e) {
    const t = this.shapes.indexOf(e);
    return t === -1 ? (console.warn("Shape does not belong to the body"), this) : (this.shapes.splice(t, 1), this.shapeOffsets.splice(t, 1), this.shapeOrientations.splice(t, 1), this.updateMassProperties(), this.updateBoundingRadius(), this.aabbNeedsUpdate = !0, e.body = null, this);
  }
  /**
   * Update the bounding radius of the body. Should be done if any of the shapes are changed.
   */
  updateBoundingRadius() {
    const e = this.shapes, t = this.shapeOffsets, n = e.length;
    let s = 0;
    for (let i = 0; i !== n; i++) {
      const o = e[i];
      o.updateBoundingSphereRadius();
      const r = t[i].length(), a = o.boundingSphereRadius;
      r + a > s && (s = r + a);
    }
    this.boundingRadius = s;
  }
  /**
   * Updates the .aabb
   */
  updateAABB() {
    const e = this.shapes, t = this.shapeOffsets, n = this.shapeOrientations, s = e.length, i = so, o = io, r = this.quaternion, a = this.aabb, c = oo;
    for (let l = 0; l !== s; l++) {
      const d = e[l];
      r.vmult(t[l], i), i.vadd(this.position, i), r.mult(n[l], o), d.calculateWorldAABB(i, o, c.lowerBound, c.upperBound), l === 0 ? a.copy(c) : a.extend(c);
    }
    this.aabbNeedsUpdate = !1;
  }
  /**
   * Update `.inertiaWorld` and `.invInertiaWorld`
   */
  updateInertiaWorld(e) {
    const t = this.invInertia;
    if (!(t.x === t.y && t.y === t.z && !e)) {
      const n = ro, s = ao;
      n.setRotationFromQuaternion(this.quaternion), n.transpose(s), n.scale(t, n), n.mmult(s, this.invInertiaWorld);
    }
  }
  /**
   * Apply force to a point of the body. This could for example be a point on the Body surface.
   * Applying force this way will add to Body.force and Body.torque.
   * @param force The amount of force to add.
   * @param relativePoint A point relative to the center of mass to apply the force on.
   */
  applyForce(e, t) {
    if (t === void 0 && (t = new p()), this.type !== z.DYNAMIC)
      return;
    this.sleepState === z.SLEEPING && this.wakeUp();
    const n = co;
    t.cross(e, n), this.force.vadd(e, this.force), this.torque.vadd(n, this.torque);
  }
  /**
   * Apply force to a local point in the body.
   * @param force The force vector to apply, defined locally in the body frame.
   * @param localPoint A local point in the body to apply the force on.
   */
  applyLocalForce(e, t) {
    if (t === void 0 && (t = new p()), this.type !== z.DYNAMIC)
      return;
    const n = lo, s = uo;
    this.vectorToWorldFrame(e, n), this.vectorToWorldFrame(t, s), this.applyForce(n, s);
  }
  /**
   * Apply torque to the body.
   * @param torque The amount of torque to add.
   */
  applyTorque(e) {
    this.type === z.DYNAMIC && (this.sleepState === z.SLEEPING && this.wakeUp(), this.torque.vadd(e, this.torque));
  }
  /**
   * Apply impulse to a point of the body. This could for example be a point on the Body surface.
   * An impulse is a force added to a body during a short period of time (impulse = force * time).
   * Impulses will be added to Body.velocity and Body.angularVelocity.
   * @param impulse The amount of impulse to add.
   * @param relativePoint A point relative to the center of mass to apply the force on.
   */
  applyImpulse(e, t) {
    if (t === void 0 && (t = new p()), this.type !== z.DYNAMIC)
      return;
    this.sleepState === z.SLEEPING && this.wakeUp();
    const n = t, s = ho;
    s.copy(e), s.scale(this.invMass, s), this.velocity.vadd(s, this.velocity);
    const i = fo;
    n.cross(e, i), this.invInertiaWorld.vmult(i, i), this.angularVelocity.vadd(i, this.angularVelocity);
  }
  /**
   * Apply locally-defined impulse to a local point in the body.
   * @param force The force vector to apply, defined locally in the body frame.
   * @param localPoint A local point in the body to apply the force on.
   */
  applyLocalImpulse(e, t) {
    if (t === void 0 && (t = new p()), this.type !== z.DYNAMIC)
      return;
    const n = po, s = mo;
    this.vectorToWorldFrame(e, n), this.vectorToWorldFrame(t, s), this.applyImpulse(n, s);
  }
  /**
   * Should be called whenever you change the body shape or mass.
   */
  updateMassProperties() {
    const e = yo;
    this.invMass = this.mass > 0 ? 1 / this.mass : 0;
    const t = this.inertia, n = this.fixedRotation;
    this.updateAABB(), e.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2), en.calculateInertia(e, this.mass, t), this.invInertia.set(t.x > 0 && !n ? 1 / t.x : 0, t.y > 0 && !n ? 1 / t.y : 0, t.z > 0 && !n ? 1 / t.z : 0), this.updateInertiaWorld(!0);
  }
  /**
   * Get world velocity of a point in the body.
   * @param worldPoint
   * @param result
   * @return The result vector.
   */
  getVelocityAtWorldPoint(e, t) {
    const n = new p();
    return e.vsub(this.position, n), this.angularVelocity.cross(n, t), this.velocity.vadd(t, t), t;
  }
  /**
   * Move the body forward in time.
   * @param dt Time step
   * @param quatNormalize Set to true to normalize the body quaternion
   * @param quatNormalizeFast If the quaternion should be normalized using "fast" quaternion normalization
   */
  integrate(e, t, n) {
    if (this.previousPosition.copy(this.position), this.previousQuaternion.copy(this.quaternion), !(this.type === z.DYNAMIC || this.type === z.KINEMATIC) || this.sleepState === z.SLEEPING)
      return;
    const s = this.velocity, i = this.angularVelocity, o = this.position, r = this.force, a = this.torque, c = this.quaternion, l = this.invMass, d = this.invInertiaWorld, u = this.linearFactor, g = l * e;
    s.x += r.x * g * u.x, s.y += r.y * g * u.y, s.z += r.z * g * u.z;
    const h = d.elements, y = this.angularFactor, m = a.x * y.x, v = a.y * y.y, w = a.z * y.z;
    i.x += e * (h[0] * m + h[1] * v + h[2] * w), i.y += e * (h[3] * m + h[4] * v + h[5] * w), i.z += e * (h[6] * m + h[7] * v + h[8] * w), o.x += s.x * e, o.y += s.y * e, o.z += s.z * e, c.integrate(this.angularVelocity, e, this.angularFactor, c), t && (n ? c.normalizeFast() : c.normalize()), this.aabbNeedsUpdate = !0, this.updateInertiaWorld();
  }
}
z.idCounter = 0;
z.COLLIDE_EVENT_NAME = "collide";
z.DYNAMIC = tn.DYNAMIC;
z.STATIC = tn.STATIC;
z.KINEMATIC = tn.KINEMATIC;
z.AWAKE = nn.AWAKE;
z.SLEEPY = nn.SLEEPY;
z.SLEEPING = nn.SLEEPING;
z.wakeupEvent = {
  type: "wakeup"
};
z.sleepyEvent = {
  type: "sleepy"
};
z.sleepEvent = {
  type: "sleep"
};
const so = new p(), io = new Y(), oo = new ie(), ro = new ce(), ao = new ce();
new ce();
const co = new p(), lo = new p(), uo = new p(), ho = new p(), fo = new p(), po = new p(), mo = new p(), yo = new p();
class go {
  /**
   * The world to search for collisions in.
   */
  /**
   * If set to true, the broadphase uses bounding boxes for intersection tests, else it uses bounding spheres.
   */
  /**
   * Set to true if the objects in the world moved.
   */
  constructor() {
    this.world = null, this.useBoundingBoxes = !1, this.dirty = !0;
  }
  /**
   * Get the collision pairs from the world
   * @param world The world to search in
   * @param p1 Empty array to be filled with body objects
   * @param p2 Empty array to be filled with body objects
   */
  collisionPairs(e, t, n) {
    throw new Error("collisionPairs not implemented for this BroadPhase class!");
  }
  /**
   * Check if a body pair needs to be intersection tested at all.
   */
  needBroadphaseCollision(e, t) {
    return !(!(e.collisionFilterGroup & t.collisionFilterMask) || !(t.collisionFilterGroup & e.collisionFilterMask) || (e.type & z.STATIC || e.sleepState === z.SLEEPING) && (t.type & z.STATIC || t.sleepState === z.SLEEPING));
  }
  /**
   * Check if the bounding volumes of two bodies intersect.
   */
  intersectionTest(e, t, n, s) {
    this.useBoundingBoxes ? this.doBoundingBoxBroadphase(e, t, n, s) : this.doBoundingSphereBroadphase(e, t, n, s);
  }
  /**
   * Check if the bounding spheres of two bodies are intersecting.
   * @param pairs1 bodyA is appended to this array if intersection
   * @param pairs2 bodyB is appended to this array if intersection
   */
  doBoundingSphereBroadphase(e, t, n, s) {
    const i = wo;
    t.position.vsub(e.position, i);
    const o = (e.boundingRadius + t.boundingRadius) ** 2;
    i.lengthSquared() < o && (n.push(e), s.push(t));
  }
  /**
   * Check if the bounding boxes of two bodies are intersecting.
   */
  doBoundingBoxBroadphase(e, t, n, s) {
    e.aabbNeedsUpdate && e.updateAABB(), t.aabbNeedsUpdate && t.updateAABB(), e.aabb.overlaps(t.aabb) && (n.push(e), s.push(t));
  }
  /**
   * Removes duplicate pairs from the pair arrays.
   */
  makePairsUnique(e, t) {
    const n = vo, s = bo, i = xo, o = e.length;
    for (let r = 0; r !== o; r++)
      s[r] = e[r], i[r] = t[r];
    e.length = 0, t.length = 0;
    for (let r = 0; r !== o; r++) {
      const a = s[r].id, c = i[r].id, l = a < c ? `${a},${c}` : `${c},${a}`;
      n[l] = r, n.keys.push(l);
    }
    for (let r = 0; r !== n.keys.length; r++) {
      const a = n.keys.pop(), c = n[a];
      e.push(s[c]), t.push(i[c]), delete n[a];
    }
  }
  /**
   * To be implemented by subcasses
   */
  setWorld(e) {
  }
  /**
   * Check if the bounding spheres of two bodies overlap.
   */
  static boundingSphereCheck(e, t) {
    const n = new p();
    e.position.vsub(t.position, n);
    const s = e.shapes[0], i = t.shapes[0];
    return Math.pow(s.boundingSphereRadius + i.boundingSphereRadius, 2) > n.lengthSquared();
  }
  /**
   * Returns all the bodies within the AABB.
   */
  aabbQuery(e, t, n) {
    return console.warn(".aabbQuery is not implemented in this Broadphase subclass."), [];
  }
}
const wo = new p();
new p();
new Y();
new p();
const vo = {
  keys: []
}, bo = [], xo = [];
new p();
new p();
new p();
class Es extends go {
  /**
   * @todo Remove useless constructor
   */
  constructor() {
    super();
  }
  /**
   * Get all the collision pairs in the physics world
   */
  collisionPairs(e, t, n) {
    const s = e.bodies, i = s.length;
    let o, r;
    for (let a = 0; a !== i; a++)
      for (let c = 0; c !== a; c++)
        o = s[a], r = s[c], this.needBroadphaseCollision(o, r) && this.intersectionTest(o, r, t, n);
  }
  /**
   * Returns all the bodies within an AABB.
   * @param result An array to store resulting bodies in.
   */
  aabbQuery(e, t, n) {
    n === void 0 && (n = []);
    for (let s = 0; s < e.bodies.length; s++) {
      const i = e.bodies[s];
      i.aabbNeedsUpdate && i.updateAABB(), i.aabb.overlaps(t) && n.push(i);
    }
    return n;
  }
}
class Et {
  /**
   * rayFromWorld
   */
  /**
   * rayToWorld
   */
  /**
   * hitNormalWorld
   */
  /**
   * hitPointWorld
   */
  /**
   * hasHit
   */
  /**
   * shape
   */
  /**
   * body
   */
  /**
   * The index of the hit triangle, if the hit shape was a trimesh
   */
  /**
   * Distance to the hit. Will be set to -1 if there was no hit
   */
  /**
   * If the ray should stop traversing the bodies
   */
  constructor() {
    this.rayFromWorld = new p(), this.rayToWorld = new p(), this.hitNormalWorld = new p(), this.hitPointWorld = new p(), this.hasHit = !1, this.shape = null, this.body = null, this.hitFaceIndex = -1, this.distance = -1, this.shouldStop = !1;
  }
  /**
   * Reset all result data.
   */
  reset() {
    this.rayFromWorld.setZero(), this.rayToWorld.setZero(), this.hitNormalWorld.setZero(), this.hitPointWorld.setZero(), this.hasHit = !1, this.shape = null, this.body = null, this.hitFaceIndex = -1, this.distance = -1, this.shouldStop = !1;
  }
  /**
   * abort
   */
  abort() {
    this.shouldStop = !0;
  }
  /**
   * Set result data.
   */
  set(e, t, n, s, i, o, r) {
    this.rayFromWorld.copy(e), this.rayToWorld.copy(t), this.hitNormalWorld.copy(n), this.hitPointWorld.copy(s), this.shape = i, this.body = o, this.distance = r;
  }
}
let Ts, Ss, _s, Rs, Ms, Cs, Ns;
const sn = {
  /** CLOSEST */
  CLOSEST: 1,
  /** ANY */
  ANY: 2,
  /** ALL */
  ALL: 4
};
Ts = F.types.SPHERE;
Ss = F.types.PLANE;
_s = F.types.BOX;
Rs = F.types.CYLINDER;
Ms = F.types.CONVEXPOLYHEDRON;
Cs = F.types.HEIGHTFIELD;
Ns = F.types.TRIMESH;
class $ {
  /**
   * from
   */
  /**
   * to
   */
  /**
   * direction
   */
  /**
   * The precision of the ray. Used when checking parallelity etc.
   * @default 0.0001
   */
  /**
   * Set to `false` if you don't want the Ray to take `collisionResponse` flags into account on bodies and shapes.
   * @default true
   */
  /**
   * If set to `true`, the ray skips any hits with normal.dot(rayDirection) < 0.
   * @default false
   */
  /**
   * collisionFilterMask
   * @default -1
   */
  /**
   * collisionFilterGroup
   * @default -1
   */
  /**
   * The intersection mode. Should be Ray.ANY, Ray.ALL or Ray.CLOSEST.
   * @default RAY.ANY
   */
  /**
   * Current result object.
   */
  /**
   * Will be set to `true` during intersectWorld() if the ray hit anything.
   */
  /**
   * User-provided result callback. Will be used if mode is Ray.ALL.
   */
  /**
   * CLOSEST
   */
  /**
   * ANY
   */
  /**
   * ALL
   */
  get [Ts]() {
    return this._intersectSphere;
  }
  get [Ss]() {
    return this._intersectPlane;
  }
  get [_s]() {
    return this._intersectBox;
  }
  get [Rs]() {
    return this._intersectConvex;
  }
  get [Ms]() {
    return this._intersectConvex;
  }
  get [Cs]() {
    return this._intersectHeightfield;
  }
  get [Ns]() {
    return this._intersectTrimesh;
  }
  constructor(e, t) {
    e === void 0 && (e = new p()), t === void 0 && (t = new p()), this.from = e.clone(), this.to = t.clone(), this.direction = new p(), this.precision = 1e-4, this.checkCollisionResponse = !0, this.skipBackfaces = !1, this.collisionFilterMask = -1, this.collisionFilterGroup = -1, this.mode = $.ANY, this.result = new Et(), this.hasHit = !1, this.callback = (n) => {
    };
  }
  /**
   * Do itersection against all bodies in the given World.
   * @return True if the ray hit anything, otherwise false.
   */
  intersectWorld(e, t) {
    return this.mode = t.mode || $.ANY, this.result = t.result || new Et(), this.skipBackfaces = !!t.skipBackfaces, this.collisionFilterMask = typeof t.collisionFilterMask < "u" ? t.collisionFilterMask : -1, this.collisionFilterGroup = typeof t.collisionFilterGroup < "u" ? t.collisionFilterGroup : -1, this.checkCollisionResponse = typeof t.checkCollisionResponse < "u" ? t.checkCollisionResponse : !0, t.from && this.from.copy(t.from), t.to && this.to.copy(t.to), this.callback = t.callback || (() => {
    }), this.hasHit = !1, this.result.reset(), this.updateDirection(), this.getAABB(In), kt.length = 0, e.broadphase.aabbQuery(e, In, kt), this.intersectBodies(kt), this.hasHit;
  }
  /**
   * Shoot a ray at a body, get back information about the hit.
   * @deprecated @param result set the result property of the Ray instead.
   */
  intersectBody(e, t) {
    t && (this.result = t, this.updateDirection());
    const n = this.checkCollisionResponse;
    if (n && !e.collisionResponse || !(this.collisionFilterGroup & e.collisionFilterMask) || !(e.collisionFilterGroup & this.collisionFilterMask))
      return;
    const s = Ao, i = Eo;
    for (let o = 0, r = e.shapes.length; o < r; o++) {
      const a = e.shapes[o];
      if (!(n && !a.collisionResponse) && (e.quaternion.mult(e.shapeOrientations[o], i), e.quaternion.vmult(e.shapeOffsets[o], s), s.vadd(e.position, s), this.intersectShape(a, i, s, e), this.result.shouldStop))
        break;
    }
  }
  /**
   * Shoot a ray at an array bodies, get back information about the hit.
   * @param bodies An array of Body objects.
   * @deprecated @param result set the result property of the Ray instead.
   *
   */
  intersectBodies(e, t) {
    t && (this.result = t, this.updateDirection());
    for (let n = 0, s = e.length; !this.result.shouldStop && n < s; n++)
      this.intersectBody(e[n]);
  }
  /**
   * Updates the direction vector.
   */
  updateDirection() {
    this.to.vsub(this.from, this.direction), this.direction.normalize();
  }
  intersectShape(e, t, n, s) {
    const i = this.from;
    if (ko(i, this.direction, n) > e.boundingSphereRadius)
      return;
    const r = this[e.type];
    r && r.call(this, e, t, n, s, e);
  }
  _intersectBox(e, t, n, s, i) {
    return this._intersectConvex(e.convexPolyhedronRepresentation, t, n, s, i);
  }
  _intersectPlane(e, t, n, s, i) {
    const o = this.from, r = this.to, a = this.direction, c = new p(0, 0, 1);
    t.vmult(c, c);
    const l = new p();
    o.vsub(n, l);
    const d = l.dot(c);
    r.vsub(n, l);
    const u = l.dot(c);
    if (d * u > 0 || o.distanceTo(r) < d)
      return;
    const g = c.dot(a);
    if (Math.abs(g) < this.precision)
      return;
    const h = new p(), y = new p(), m = new p();
    o.vsub(n, h);
    const v = -c.dot(h) / g;
    a.scale(v, y), o.vadd(y, m), this.reportIntersection(c, m, i, s, -1);
  }
  /**
   * Get the world AABB of the ray.
   */
  getAABB(e) {
    const {
      lowerBound: t,
      upperBound: n
    } = e, s = this.to, i = this.from;
    t.x = Math.min(s.x, i.x), t.y = Math.min(s.y, i.y), t.z = Math.min(s.z, i.z), n.x = Math.max(s.x, i.x), n.y = Math.max(s.y, i.y), n.z = Math.max(s.z, i.z);
  }
  _intersectHeightfield(e, t, n, s, i) {
    e.data, e.elementSize;
    const o = To;
    o.from.copy(this.from), o.to.copy(this.to), G.pointToLocalFrame(n, t, o.from, o.from), G.pointToLocalFrame(n, t, o.to, o.to), o.updateDirection();
    const r = So;
    let a, c, l, d;
    a = c = 0, l = d = e.data.length - 1;
    const u = new ie();
    o.getAABB(u), e.getIndexOfPosition(u.lowerBound.x, u.lowerBound.y, r, !0), a = Math.max(a, r[0]), c = Math.max(c, r[1]), e.getIndexOfPosition(u.upperBound.x, u.upperBound.y, r, !0), l = Math.min(l, r[0] + 1), d = Math.min(d, r[1] + 1);
    for (let g = a; g < l; g++)
      for (let h = c; h < d; h++) {
        if (this.result.shouldStop)
          return;
        if (e.getAabbAtIndex(g, h, u), !!u.overlapsRay(o)) {
          if (e.getConvexTrianglePillar(g, h, !1), G.pointToWorldFrame(n, t, e.pillarOffset, ft), this._intersectConvex(e.pillarConvex, t, ft, s, i, Ln), this.result.shouldStop)
            return;
          e.getConvexTrianglePillar(g, h, !0), G.pointToWorldFrame(n, t, e.pillarOffset, ft), this._intersectConvex(e.pillarConvex, t, ft, s, i, Ln);
        }
      }
  }
  _intersectSphere(e, t, n, s, i) {
    const o = this.from, r = this.to, a = e.radius, c = (r.x - o.x) ** 2 + (r.y - o.y) ** 2 + (r.z - o.z) ** 2, l = 2 * ((r.x - o.x) * (o.x - n.x) + (r.y - o.y) * (o.y - n.y) + (r.z - o.z) * (o.z - n.z)), d = (o.x - n.x) ** 2 + (o.y - n.y) ** 2 + (o.z - n.z) ** 2 - a ** 2, u = l ** 2 - 4 * c * d, g = _o, h = Ro;
    if (!(u < 0))
      if (u === 0)
        o.lerp(r, u, g), g.vsub(n, h), h.normalize(), this.reportIntersection(h, g, i, s, -1);
      else {
        const y = (-l - Math.sqrt(u)) / (2 * c), m = (-l + Math.sqrt(u)) / (2 * c);
        if (y >= 0 && y <= 1 && (o.lerp(r, y, g), g.vsub(n, h), h.normalize(), this.reportIntersection(h, g, i, s, -1)), this.result.shouldStop)
          return;
        m >= 0 && m <= 1 && (o.lerp(r, m, g), g.vsub(n, h), h.normalize(), this.reportIntersection(h, g, i, s, -1));
      }
  }
  _intersectConvex(e, t, n, s, i, o) {
    const r = Mo, a = On, c = o && o.faceList || null, l = e.faces, d = e.vertices, u = e.faceNormals, g = this.direction, h = this.from, y = this.to, m = h.distanceTo(y), v = c ? c.length : l.length, w = this.result;
    for (let x = 0; !w.shouldStop && x < v; x++) {
      const A = c ? c[x] : x, T = l[A], S = u[A], N = t, R = n;
      a.copy(d[T[0]]), N.vmult(a, a), a.vadd(R, a), a.vsub(h, a), N.vmult(S, r);
      const M = g.dot(r);
      if (Math.abs(M) < this.precision)
        continue;
      const P = r.dot(a) / M;
      if (!(P < 0)) {
        g.scale(P, te), te.vadd(h, te), ae.copy(d[T[0]]), N.vmult(ae, ae), R.vadd(ae, ae);
        for (let O = 1; !w.shouldStop && O < T.length - 1; O++) {
          ue.copy(d[T[O]]), he.copy(d[T[O + 1]]), N.vmult(ue, ue), N.vmult(he, he), R.vadd(ue, ue), R.vadd(he, he);
          const L = te.distanceTo(h);
          !($.pointInTriangle(te, ae, ue, he) || $.pointInTriangle(te, ue, ae, he)) || L > m || this.reportIntersection(r, te, i, s, A);
        }
      }
    }
  }
  /**
   * @todo Optimize by transforming the world to local space first.
   * @todo Use Octree lookup
   */
  _intersectTrimesh(e, t, n, s, i, o) {
    const r = Co, a = Fo, c = zo, l = On, d = No, u = Po, g = Io, h = Oo, y = Lo, m = e.indices;
    e.vertices;
    const v = this.from, w = this.to, x = this.direction;
    c.position.copy(n), c.quaternion.copy(t), G.vectorToLocalFrame(n, t, x, d), G.pointToLocalFrame(n, t, v, u), G.pointToLocalFrame(n, t, w, g), g.x *= e.scale.x, g.y *= e.scale.y, g.z *= e.scale.z, u.x *= e.scale.x, u.y *= e.scale.y, u.z *= e.scale.z, g.vsub(u, d), d.normalize();
    const A = u.distanceSquared(g);
    e.tree.rayQuery(this, c, a);
    for (let T = 0, S = a.length; !this.result.shouldStop && T !== S; T++) {
      const N = a[T];
      e.getNormal(N, r), e.getVertex(m[N * 3], ae), ae.vsub(u, l);
      const R = d.dot(r), M = r.dot(l) / R;
      if (M < 0)
        continue;
      d.scale(M, te), te.vadd(u, te), e.getVertex(m[N * 3 + 1], ue), e.getVertex(m[N * 3 + 2], he);
      const P = te.distanceSquared(u);
      !($.pointInTriangle(te, ue, ae, he) || $.pointInTriangle(te, ae, ue, he)) || P > A || (G.vectorToWorldFrame(t, r, y), G.pointToWorldFrame(n, t, te, h), this.reportIntersection(y, h, i, s, N));
    }
    a.length = 0;
  }
  /**
   * @return True if the intersections should continue
   */
  reportIntersection(e, t, n, s, i) {
    const o = this.from, r = this.to, a = o.distanceTo(t), c = this.result;
    if (!(this.skipBackfaces && e.dot(this.direction) > 0))
      switch (c.hitFaceIndex = typeof i < "u" ? i : -1, this.mode) {
        case $.ALL:
          this.hasHit = !0, c.set(o, r, e, t, n, s, a), c.hasHit = !0, this.callback(c);
          break;
        case $.CLOSEST:
          (a < c.distance || !c.hasHit) && (this.hasHit = !0, c.hasHit = !0, c.set(o, r, e, t, n, s, a));
          break;
        case $.ANY:
          this.hasHit = !0, c.hasHit = !0, c.set(o, r, e, t, n, s, a), c.shouldStop = !0;
          break;
      }
  }
  /**
   * As per "Barycentric Technique" as named
   * {@link https://www.blackpawn.com/texts/pointinpoly/default.html here} but without the division
   */
  static pointInTriangle(e, t, n, s) {
    s.vsub(t, Ne), n.vsub(t, $e), e.vsub(t, Bt);
    const i = Ne.dot(Ne), o = Ne.dot($e), r = Ne.dot(Bt), a = $e.dot($e), c = $e.dot(Bt);
    let l, d;
    return (l = a * r - o * c) >= 0 && (d = i * c - o * r) >= 0 && l + d < i * a - o * o;
  }
}
$.CLOSEST = sn.CLOSEST;
$.ANY = sn.ANY;
$.ALL = sn.ALL;
const In = new ie(), kt = [], $e = new p(), Bt = new p(), Ao = new p(), Eo = new Y(), te = new p(), ae = new p(), ue = new p(), he = new p();
new p();
new Et();
const Ln = {
  faceList: [0]
}, ft = new p(), To = new $(), So = [], _o = new p(), Ro = new p(), Mo = new p();
new p();
new p();
const On = new p(), Co = new p(), No = new p(), Po = new p(), Io = new p(), Lo = new p(), Oo = new p();
new ie();
const Fo = [], zo = new G(), Ne = new p(), pt = new p();
function ko(f, e, t) {
  t.vsub(f, Ne);
  const n = Ne.dot(e);
  return e.scale(n, pt), pt.vadd(f, pt), t.distanceTo(pt);
}
class Bo {
  /**
   * Extend an options object with default values.
   * @param options The options object. May be falsy: in this case, a new object is created and returned.
   * @param defaults An object containing default values.
   * @return The modified options object.
   */
  static defaults(e, t) {
    e === void 0 && (e = {});
    for (let n in t)
      n in e || (e[n] = t[n]);
    return e;
  }
}
class Fn {
  /**
   * spatial
   */
  /**
   * rotational
   */
  constructor() {
    this.spatial = new p(), this.rotational = new p();
  }
  /**
   * Multiply with other JacobianElement
   */
  multiplyElement(e) {
    return e.spatial.dot(this.spatial) + e.rotational.dot(this.rotational);
  }
  /**
   * Multiply with two vectors
   */
  multiplyVectors(e, t) {
    return e.dot(this.spatial) + t.dot(this.rotational);
  }
}
class lt {
  /**
   * Minimum (read: negative max) force to be applied by the constraint.
   */
  /**
   * Maximum (read: positive max) force to be applied by the constraint.
   */
  /**
   * SPOOK parameter
   */
  /**
   * SPOOK parameter
   */
  /**
   * SPOOK parameter
   */
  /**
   * A number, proportional to the force added to the bodies.
   */
  constructor(e, t, n, s) {
    n === void 0 && (n = -1e6), s === void 0 && (s = 1e6), this.id = lt.idCounter++, this.minForce = n, this.maxForce = s, this.bi = e, this.bj = t, this.a = 0, this.b = 0, this.eps = 0, this.jacobianElementA = new Fn(), this.jacobianElementB = new Fn(), this.enabled = !0, this.multiplier = 0, this.setSpookParams(1e7, 4, 1 / 60);
  }
  /**
   * Recalculates a, b, and eps.
   *
   * The Equation constructor sets typical SPOOK parameters as such:
   * * `stiffness` = 1e7
   * * `relaxation` = 4
   * * `timeStep`= 1 / 60, _note the hardcoded refresh rate._
   */
  setSpookParams(e, t, n) {
    const s = t, i = e, o = n;
    this.a = 4 / (o * (1 + 4 * s)), this.b = 4 * s / (1 + 4 * s), this.eps = 4 / (o * o * i * (1 + 4 * s));
  }
  /**
   * Computes the right hand side of the SPOOK equation
   */
  computeB(e, t, n) {
    const s = this.computeGW(), i = this.computeGq(), o = this.computeGiMf();
    return -i * e - s * t - o * n;
  }
  /**
   * Computes G*q, where q are the generalized body coordinates
   */
  computeGq() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, s = this.bj, i = n.position, o = s.position;
    return e.spatial.dot(i) + t.spatial.dot(o);
  }
  /**
   * Computes G*W, where W are the body velocities
   */
  computeGW() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, s = this.bj, i = n.velocity, o = s.velocity, r = n.angularVelocity, a = s.angularVelocity;
    return e.multiplyVectors(i, r) + t.multiplyVectors(o, a);
  }
  /**
   * Computes G*Wlambda, where W are the body velocities
   */
  computeGWlambda() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, s = this.bj, i = n.vlambda, o = s.vlambda, r = n.wlambda, a = s.wlambda;
    return e.multiplyVectors(i, r) + t.multiplyVectors(o, a);
  }
  /**
   * Computes G*inv(M)*f, where M is the mass matrix with diagonal blocks for each body, and f are the forces on the bodies.
   */
  computeGiMf() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, s = this.bj, i = n.force, o = n.torque, r = s.force, a = s.torque, c = n.invMassSolve, l = s.invMassSolve;
    return i.scale(c, zn), r.scale(l, kn), n.invInertiaWorldSolve.vmult(o, Bn), s.invInertiaWorldSolve.vmult(a, jn), e.multiplyVectors(zn, Bn) + t.multiplyVectors(kn, jn);
  }
  /**
   * Computes G*inv(M)*G'
   */
  computeGiMGt() {
    const e = this.jacobianElementA, t = this.jacobianElementB, n = this.bi, s = this.bj, i = n.invMassSolve, o = s.invMassSolve, r = n.invInertiaWorldSolve, a = s.invInertiaWorldSolve;
    let c = i + o;
    return r.vmult(e.rotational, mt), c += mt.dot(e.rotational), a.vmult(t.rotational, mt), c += mt.dot(t.rotational), c;
  }
  /**
   * Add constraint velocity to the bodies.
   */
  addToWlambda(e) {
    const t = this.jacobianElementA, n = this.jacobianElementB, s = this.bi, i = this.bj, o = jo;
    s.vlambda.addScaledVector(s.invMassSolve * e, t.spatial, s.vlambda), i.vlambda.addScaledVector(i.invMassSolve * e, n.spatial, i.vlambda), s.invInertiaWorldSolve.vmult(t.rotational, o), s.wlambda.addScaledVector(e, o, s.wlambda), i.invInertiaWorldSolve.vmult(n.rotational, o), i.wlambda.addScaledVector(e, o, i.wlambda);
  }
  /**
   * Compute the denominator part of the SPOOK equation: C = G*inv(M)*G' + eps
   */
  computeC() {
    return this.computeGiMGt() + this.eps;
  }
}
lt.idCounter = 0;
const zn = new p(), kn = new p(), Bn = new p(), jn = new p(), mt = new p(), jo = new p();
class Do extends lt {
  /**
   * "bounciness": u1 = -e*u0
   */
  /**
   * World-oriented vector that goes from the center of bi to the contact point.
   */
  /**
   * World-oriented vector that starts in body j position and goes to the contact point.
   */
  /**
   * Contact normal, pointing out of body i.
   */
  constructor(e, t, n) {
    n === void 0 && (n = 1e6), super(e, t, 0, n), this.restitution = 0, this.ri = new p(), this.rj = new p(), this.ni = new p();
  }
  computeB(e) {
    const t = this.a, n = this.b, s = this.bi, i = this.bj, o = this.ri, r = this.rj, a = Ho, c = qo, l = s.velocity, d = s.angularVelocity;
    s.force, s.torque;
    const u = i.velocity, g = i.angularVelocity;
    i.force, i.torque;
    const h = Go, y = this.jacobianElementA, m = this.jacobianElementB, v = this.ni;
    o.cross(v, a), r.cross(v, c), v.negate(y.spatial), a.negate(y.rotational), m.spatial.copy(v), m.rotational.copy(c), h.copy(i.position), h.vadd(r, h), h.vsub(s.position, h), h.vsub(o, h);
    const w = v.dot(h), x = this.restitution + 1, A = x * u.dot(v) - x * l.dot(v) + g.dot(c) - d.dot(a), T = this.computeGiMf();
    return -w * t - A * n - e * T;
  }
  /**
   * Get the current relative velocity in the contact point.
   */
  getImpactVelocityAlongNormal() {
    const e = Uo, t = Vo, n = Wo, s = Xo, i = Ko;
    return this.bi.position.vadd(this.ri, n), this.bj.position.vadd(this.rj, s), this.bi.getVelocityAtWorldPoint(n, e), this.bj.getVelocityAtWorldPoint(s, t), e.vsub(t, i), this.ni.dot(i);
  }
}
const Ho = new p(), qo = new p(), Go = new p(), Uo = new p(), Vo = new p(), Wo = new p(), Xo = new p(), Ko = new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
class Dn extends lt {
  // Tangent
  /**
   * @param slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
   */
  constructor(e, t, n) {
    super(e, t, -n, n), this.ri = new p(), this.rj = new p(), this.t = new p();
  }
  computeB(e) {
    this.a;
    const t = this.b;
    this.bi, this.bj;
    const n = this.ri, s = this.rj, i = Yo, o = $o, r = this.t;
    n.cross(r, i), s.cross(r, o);
    const a = this.jacobianElementA, c = this.jacobianElementB;
    r.negate(a.spatial), i.negate(a.rotational), c.spatial.copy(r), c.rotational.copy(o);
    const l = this.computeGW(), d = this.computeGiMf();
    return -l * t - e * d;
  }
}
const Yo = new p(), $o = new p();
class St {
  /**
   * Identifier of this material.
   */
  /**
   * Participating materials.
   */
  /**
   * Friction coefficient.
   * @default 0.3
   */
  /**
   * Restitution coefficient.
   * @default 0.3
   */
  /**
   * Stiffness of the produced contact equations.
   * @default 1e7
   */
  /**
   * Relaxation time of the produced contact equations.
   * @default 3
   */
  /**
   * Stiffness of the produced friction equations.
   * @default 1e7
   */
  /**
   * Relaxation time of the produced friction equations
   * @default 3
   */
  constructor(e, t, n) {
    n = Bo.defaults(n, {
      friction: 0.3,
      restitution: 0.3,
      contactEquationStiffness: 1e7,
      contactEquationRelaxation: 3,
      frictionEquationStiffness: 1e7,
      frictionEquationRelaxation: 3
    }), this.id = St.idCounter++, this.materials = [e, t], this.friction = n.friction, this.restitution = n.restitution, this.contactEquationStiffness = n.contactEquationStiffness, this.contactEquationRelaxation = n.contactEquationRelaxation, this.frictionEquationStiffness = n.frictionEquationStiffness, this.frictionEquationRelaxation = n.frictionEquationRelaxation;
  }
}
St.idCounter = 0;
class _t {
  /**
   * Material name.
   * If options is a string, name will be set to that string.
   * @todo Deprecate this
   */
  /** Material id. */
  /**
   * Friction for this material.
   * If non-negative, it will be used instead of the friction given by ContactMaterials. If there's no matching ContactMaterial, the value from `defaultContactMaterial` in the World will be used.
   */
  /**
   * Restitution for this material.
   * If non-negative, it will be used instead of the restitution given by ContactMaterials. If there's no matching ContactMaterial, the value from `defaultContactMaterial` in the World will be used.
   */
  constructor(e) {
    e === void 0 && (e = {});
    let t = "";
    typeof e == "string" && (t = e, e = {}), this.name = t, this.id = _t.idCounter++, this.friction = typeof e.friction < "u" ? e.friction : -1, this.restitution = typeof e.restitution < "u" ? e.restitution : -1;
  }
}
_t.idCounter = 0;
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new $();
new p();
new p();
new p();
new p(1, 0, 0), new p(0, 1, 0), new p(0, 0, 1);
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new ie();
new p();
new ie();
new p();
new p();
new p();
new p();
new p();
new p();
new p();
new ie();
new p();
new G();
new ie();
class Zo {
  /**
   * All equations to be solved
   */
  /**
   * @todo remove useless constructor
   */
  constructor() {
    this.equations = [];
  }
  /**
   * Should be implemented in subclasses!
   * @todo use abstract
   * @return number of iterations performed
   */
  solve(e, t) {
    return (
      // Should return the number of iterations done!
      0
    );
  }
  /**
   * Add an equation
   */
  addEquation(e) {
    e.enabled && !e.bi.isTrigger && !e.bj.isTrigger && this.equations.push(e);
  }
  /**
   * Remove an equation
   */
  removeEquation(e) {
    const t = this.equations, n = t.indexOf(e);
    n !== -1 && t.splice(n, 1);
  }
  /**
   * Add all equations
   */
  removeAllEquations() {
    this.equations.length = 0;
  }
}
class Qo extends Zo {
  /**
   * The number of solver iterations determines quality of the constraints in the world.
   * The more iterations, the more correct simulation. More iterations need more computations though. If you have a large gravity force in your world, you will need more iterations.
   */
  /**
   * When tolerance is reached, the system is assumed to be converged.
   */
  /**
   * @todo remove useless constructor
   */
  constructor() {
    super(), this.iterations = 10, this.tolerance = 1e-7;
  }
  /**
   * Solve
   * @return number of iterations performed
   */
  solve(e, t) {
    let n = 0;
    const s = this.iterations, i = this.tolerance * this.tolerance, o = this.equations, r = o.length, a = t.bodies, c = a.length, l = e;
    let d, u, g, h, y, m;
    if (r !== 0)
      for (let A = 0; A !== c; A++)
        a[A].updateSolveMassProperties();
    const v = er, w = tr, x = Jo;
    v.length = r, w.length = r, x.length = r;
    for (let A = 0; A !== r; A++) {
      const T = o[A];
      x[A] = 0, w[A] = T.computeB(l), v[A] = 1 / T.computeC();
    }
    if (r !== 0) {
      for (let S = 0; S !== c; S++) {
        const N = a[S], R = N.vlambda, M = N.wlambda;
        R.set(0, 0, 0), M.set(0, 0, 0);
      }
      for (n = 0; n !== s; n++) {
        h = 0;
        for (let S = 0; S !== r; S++) {
          const N = o[S];
          d = w[S], u = v[S], m = x[S], y = N.computeGWlambda(), g = u * (d - y - N.eps * m), m + g < N.minForce ? g = N.minForce - m : m + g > N.maxForce && (g = N.maxForce - m), x[S] += g, h += g > 0 ? g : -g, N.addToWlambda(g);
        }
        if (h * h < i)
          break;
      }
      for (let S = 0; S !== c; S++) {
        const N = a[S], R = N.velocity, M = N.angularVelocity;
        N.vlambda.vmul(N.linearFactor, N.vlambda), R.vadd(N.vlambda, R), N.wlambda.vmul(N.angularFactor, N.wlambda), M.vadd(N.wlambda, M);
      }
      let A = o.length;
      const T = 1 / l;
      for (; A--; )
        o[A].multiplier = x[A] * T;
    }
    return n;
  }
}
const Jo = [], er = [], tr = [];
z.STATIC;
class nr {
  constructor() {
    this.objects = [], this.type = Object;
  }
  /**
   * Release an object after use
   */
  release() {
    const e = arguments.length;
    for (let t = 0; t !== e; t++)
      this.objects.push(t < 0 || arguments.length <= t ? void 0 : arguments[t]);
    return this;
  }
  /**
   * Get an object
   */
  get() {
    return this.objects.length === 0 ? this.constructObject() : this.objects.pop();
  }
  /**
   * Construct an object. Should be implemented in each subclass.
   */
  constructObject() {
    throw new Error("constructObject() not implemented in this Pool subclass yet!");
  }
  /**
   * @return Self, for chaining
   */
  resize(e) {
    const t = this.objects;
    for (; t.length > e; )
      t.pop();
    for (; t.length < e; )
      t.push(this.constructObject());
    return this;
  }
}
class sr extends nr {
  constructor() {
    super(...arguments), this.type = p;
  }
  /**
   * Construct a vector
   */
  constructObject() {
    return new p();
  }
}
const W = {
  sphereSphere: F.types.SPHERE,
  spherePlane: F.types.SPHERE | F.types.PLANE,
  boxBox: F.types.BOX | F.types.BOX,
  sphereBox: F.types.SPHERE | F.types.BOX,
  planeBox: F.types.PLANE | F.types.BOX,
  convexConvex: F.types.CONVEXPOLYHEDRON,
  sphereConvex: F.types.SPHERE | F.types.CONVEXPOLYHEDRON,
  planeConvex: F.types.PLANE | F.types.CONVEXPOLYHEDRON,
  boxConvex: F.types.BOX | F.types.CONVEXPOLYHEDRON,
  sphereHeightfield: F.types.SPHERE | F.types.HEIGHTFIELD,
  boxHeightfield: F.types.BOX | F.types.HEIGHTFIELD,
  convexHeightfield: F.types.CONVEXPOLYHEDRON | F.types.HEIGHTFIELD,
  sphereParticle: F.types.PARTICLE | F.types.SPHERE,
  planeParticle: F.types.PLANE | F.types.PARTICLE,
  boxParticle: F.types.BOX | F.types.PARTICLE,
  convexParticle: F.types.PARTICLE | F.types.CONVEXPOLYHEDRON,
  cylinderCylinder: F.types.CYLINDER,
  sphereCylinder: F.types.SPHERE | F.types.CYLINDER,
  planeCylinder: F.types.PLANE | F.types.CYLINDER,
  boxCylinder: F.types.BOX | F.types.CYLINDER,
  convexCylinder: F.types.CONVEXPOLYHEDRON | F.types.CYLINDER,
  heightfieldCylinder: F.types.HEIGHTFIELD | F.types.CYLINDER,
  particleCylinder: F.types.PARTICLE | F.types.CYLINDER,
  sphereTrimesh: F.types.SPHERE | F.types.TRIMESH,
  planeTrimesh: F.types.PLANE | F.types.TRIMESH
};
class ir {
  /**
   * Internal storage of pooled contact points.
   */
  /**
   * Pooled vectors.
   */
  get [W.sphereSphere]() {
    return this.sphereSphere;
  }
  get [W.spherePlane]() {
    return this.spherePlane;
  }
  get [W.boxBox]() {
    return this.boxBox;
  }
  get [W.sphereBox]() {
    return this.sphereBox;
  }
  get [W.planeBox]() {
    return this.planeBox;
  }
  get [W.convexConvex]() {
    return this.convexConvex;
  }
  get [W.sphereConvex]() {
    return this.sphereConvex;
  }
  get [W.planeConvex]() {
    return this.planeConvex;
  }
  get [W.boxConvex]() {
    return this.boxConvex;
  }
  get [W.sphereHeightfield]() {
    return this.sphereHeightfield;
  }
  get [W.boxHeightfield]() {
    return this.boxHeightfield;
  }
  get [W.convexHeightfield]() {
    return this.convexHeightfield;
  }
  get [W.sphereParticle]() {
    return this.sphereParticle;
  }
  get [W.planeParticle]() {
    return this.planeParticle;
  }
  get [W.boxParticle]() {
    return this.boxParticle;
  }
  get [W.convexParticle]() {
    return this.convexParticle;
  }
  get [W.cylinderCylinder]() {
    return this.convexConvex;
  }
  get [W.sphereCylinder]() {
    return this.sphereConvex;
  }
  get [W.planeCylinder]() {
    return this.planeConvex;
  }
  get [W.boxCylinder]() {
    return this.boxConvex;
  }
  get [W.convexCylinder]() {
    return this.convexConvex;
  }
  get [W.heightfieldCylinder]() {
    return this.heightfieldCylinder;
  }
  get [W.particleCylinder]() {
    return this.particleCylinder;
  }
  get [W.sphereTrimesh]() {
    return this.sphereTrimesh;
  }
  get [W.planeTrimesh]() {
    return this.planeTrimesh;
  }
  // get [COLLISION_TYPES.convexTrimesh]() {
  //   return this.convexTrimesh
  // }
  constructor(e) {
    this.contactPointPool = [], this.frictionEquationPool = [], this.result = [], this.frictionResult = [], this.v3pool = new sr(), this.world = e, this.currentContactMaterial = e.defaultContactMaterial, this.enableFrictionReduction = !1;
  }
  /**
   * Make a contact object, by using the internal pool or creating a new one.
   */
  createContactEquation(e, t, n, s, i, o) {
    let r;
    this.contactPointPool.length ? (r = this.contactPointPool.pop(), r.bi = e, r.bj = t) : r = new Do(e, t), r.enabled = e.collisionResponse && t.collisionResponse && n.collisionResponse && s.collisionResponse;
    const a = this.currentContactMaterial;
    r.restitution = a.restitution, r.setSpookParams(a.contactEquationStiffness, a.contactEquationRelaxation, this.world.dt);
    const c = n.material || e.material, l = s.material || t.material;
    return c && l && c.restitution >= 0 && l.restitution >= 0 && (r.restitution = c.restitution * l.restitution), r.si = i || n, r.sj = o || s, r;
  }
  createFrictionEquationsFromContact(e, t) {
    const n = e.bi, s = e.bj, i = e.si, o = e.sj, r = this.world, a = this.currentContactMaterial;
    let c = a.friction;
    const l = i.material || n.material, d = o.material || s.material;
    if (l && d && l.friction >= 0 && d.friction >= 0 && (c = l.friction * d.friction), c > 0) {
      const u = c * (r.frictionGravity || r.gravity).length();
      let g = n.invMass + s.invMass;
      g > 0 && (g = 1 / g);
      const h = this.frictionEquationPool, y = h.length ? h.pop() : new Dn(n, s, u * g), m = h.length ? h.pop() : new Dn(n, s, u * g);
      return y.bi = m.bi = n, y.bj = m.bj = s, y.minForce = m.minForce = -u * g, y.maxForce = m.maxForce = u * g, y.ri.copy(e.ri), y.rj.copy(e.rj), m.ri.copy(e.ri), m.rj.copy(e.rj), e.ni.tangents(y.t, m.t), y.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, r.dt), m.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, r.dt), y.enabled = m.enabled = e.enabled, t.push(y, m), !0;
    }
    return !1;
  }
  /**
   * Take the average N latest contact point on the plane.
   */
  createFrictionFromAverage(e) {
    let t = this.result[this.result.length - 1];
    if (!this.createFrictionEquationsFromContact(t, this.frictionResult) || e === 1)
      return;
    const n = this.frictionResult[this.frictionResult.length - 2], s = this.frictionResult[this.frictionResult.length - 1];
    Re.setZero(), ke.setZero(), Be.setZero();
    const i = t.bi;
    t.bj;
    for (let r = 0; r !== e; r++)
      t = this.result[this.result.length - 1 - r], t.bi !== i ? (Re.vadd(t.ni, Re), ke.vadd(t.ri, ke), Be.vadd(t.rj, Be)) : (Re.vsub(t.ni, Re), ke.vadd(t.rj, ke), Be.vadd(t.ri, Be));
    const o = 1 / e;
    ke.scale(o, n.ri), Be.scale(o, n.rj), s.ri.copy(n.ri), s.rj.copy(n.rj), Re.normalize(), Re.tangents(n.t, s.t);
  }
  /**
   * Generate all contacts between a list of body pairs
   * @param p1 Array of body indices
   * @param p2 Array of body indices
   * @param result Array to store generated contacts
   * @param oldcontacts Optional. Array of reusable contact objects
   */
  getContacts(e, t, n, s, i, o, r) {
    this.contactPointPool = i, this.frictionEquationPool = r, this.result = s, this.frictionResult = o;
    const a = ar, c = cr, l = or, d = rr;
    for (let u = 0, g = e.length; u !== g; u++) {
      const h = e[u], y = t[u];
      let m = null;
      h.material && y.material && (m = n.getContactMaterial(h.material, y.material) || null);
      const v = h.type & z.KINEMATIC && y.type & z.STATIC || h.type & z.STATIC && y.type & z.KINEMATIC || h.type & z.KINEMATIC && y.type & z.KINEMATIC;
      for (let w = 0; w < h.shapes.length; w++) {
        h.quaternion.mult(h.shapeOrientations[w], a), h.quaternion.vmult(h.shapeOffsets[w], l), l.vadd(h.position, l);
        const x = h.shapes[w];
        for (let A = 0; A < y.shapes.length; A++) {
          y.quaternion.mult(y.shapeOrientations[A], c), y.quaternion.vmult(y.shapeOffsets[A], d), d.vadd(y.position, d);
          const T = y.shapes[A];
          if (!(x.collisionFilterMask & T.collisionFilterGroup && T.collisionFilterMask & x.collisionFilterGroup) || l.distanceTo(d) > x.boundingSphereRadius + T.boundingSphereRadius)
            continue;
          let S = null;
          x.material && T.material && (S = n.getContactMaterial(x.material, T.material) || null), this.currentContactMaterial = S || m || n.defaultContactMaterial;
          const N = x.type | T.type, R = this[N];
          if (R) {
            let M = !1;
            x.type < T.type ? M = R.call(this, x, T, l, d, a, c, h, y, x, T, v) : M = R.call(this, T, x, d, l, c, a, y, h, x, T, v), M && v && (n.shapeOverlapKeeper.set(x.id, T.id), n.bodyOverlapKeeper.set(h.id, y.id));
          }
        }
      }
    }
  }
  sphereSphere(e, t, n, s, i, o, r, a, c, l, d) {
    if (d)
      return n.distanceSquared(s) < (e.radius + t.radius) ** 2;
    const u = this.createContactEquation(r, a, e, t, c, l);
    s.vsub(n, u.ni), u.ni.normalize(), u.ri.copy(u.ni), u.rj.copy(u.ni), u.ri.scale(e.radius, u.ri), u.rj.scale(-t.radius, u.rj), u.ri.vadd(n, u.ri), u.ri.vsub(r.position, u.ri), u.rj.vadd(s, u.rj), u.rj.vsub(a.position, u.rj), this.result.push(u), this.createFrictionEquationsFromContact(u, this.frictionResult);
  }
  spherePlane(e, t, n, s, i, o, r, a, c, l, d) {
    const u = this.createContactEquation(r, a, e, t, c, l);
    if (u.ni.set(0, 0, 1), o.vmult(u.ni, u.ni), u.ni.negate(u.ni), u.ni.normalize(), u.ni.scale(e.radius, u.ri), n.vsub(s, yt), u.ni.scale(u.ni.dot(yt), Hn), yt.vsub(Hn, u.rj), -yt.dot(u.ni) <= e.radius) {
      if (d)
        return !0;
      const g = u.ri, h = u.rj;
      g.vadd(n, g), g.vsub(r.position, g), h.vadd(s, h), h.vsub(a.position, h), this.result.push(u), this.createFrictionEquationsFromContact(u, this.frictionResult);
    }
  }
  boxBox(e, t, n, s, i, o, r, a, c, l, d) {
    return e.convexPolyhedronRepresentation.material = e.material, t.convexPolyhedronRepresentation.material = t.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, this.convexConvex(e.convexPolyhedronRepresentation, t.convexPolyhedronRepresentation, n, s, i, o, r, a, e, t, d);
  }
  sphereBox(e, t, n, s, i, o, r, a, c, l, d) {
    const u = this.v3pool, g = Or;
    n.vsub(s, gt), t.getSideNormals(g, o);
    const h = e.radius;
    let y = !1;
    const m = zr, v = kr, w = Br;
    let x = null, A = 0, T = 0, S = 0, N = null;
    for (let _ = 0, j = g.length; _ !== j && y === !1; _++) {
      const D = Pr;
      D.copy(g[_]);
      const H = D.length();
      D.normalize();
      const J = gt.dot(D);
      if (J < H + h && J > 0) {
        const Q = Ir, B = Lr;
        Q.copy(g[(_ + 1) % 3]), B.copy(g[(_ + 2) % 3]);
        const xe = Q.length(), Le = B.length();
        Q.normalize(), B.normalize();
        const Ve = gt.dot(Q), We = gt.dot(B);
        if (Ve < xe && Ve > -xe && We < Le && We > -Le) {
          const ut = Math.abs(J - H - h);
          if ((N === null || ut < N) && (N = ut, T = Ve, S = We, x = H, m.copy(D), v.copy(Q), w.copy(B), A++, d))
            return !0;
        }
      }
    }
    if (A) {
      y = !0;
      const _ = this.createContactEquation(r, a, e, t, c, l);
      m.scale(-h, _.ri), _.ni.copy(m), _.ni.negate(_.ni), m.scale(x, m), v.scale(T, v), m.vadd(v, m), w.scale(S, w), m.vadd(w, _.rj), _.ri.vadd(n, _.ri), _.ri.vsub(r.position, _.ri), _.rj.vadd(s, _.rj), _.rj.vsub(a.position, _.rj), this.result.push(_), this.createFrictionEquationsFromContact(_, this.frictionResult);
    }
    let R = u.get();
    const M = Fr;
    for (let _ = 0; _ !== 2 && !y; _++)
      for (let j = 0; j !== 2 && !y; j++)
        for (let D = 0; D !== 2 && !y; D++)
          if (R.set(0, 0, 0), _ ? R.vadd(g[0], R) : R.vsub(g[0], R), j ? R.vadd(g[1], R) : R.vsub(g[1], R), D ? R.vadd(g[2], R) : R.vsub(g[2], R), s.vadd(R, M), M.vsub(n, M), M.lengthSquared() < h * h) {
            if (d)
              return !0;
            y = !0;
            const H = this.createContactEquation(r, a, e, t, c, l);
            H.ri.copy(M), H.ri.normalize(), H.ni.copy(H.ri), H.ri.scale(h, H.ri), H.rj.copy(R), H.ri.vadd(n, H.ri), H.ri.vsub(r.position, H.ri), H.rj.vadd(s, H.rj), H.rj.vsub(a.position, H.rj), this.result.push(H), this.createFrictionEquationsFromContact(H, this.frictionResult);
          }
    u.release(R), R = null;
    const P = u.get(), O = u.get(), L = u.get(), E = u.get(), I = u.get(), C = g.length;
    for (let _ = 0; _ !== C && !y; _++)
      for (let j = 0; j !== C && !y; j++)
        if (_ % 3 !== j % 3) {
          g[j].cross(g[_], P), P.normalize(), g[_].vadd(g[j], O), L.copy(n), L.vsub(O, L), L.vsub(s, L);
          const D = L.dot(P);
          P.scale(D, E);
          let H = 0;
          for (; H === _ % 3 || H === j % 3; )
            H++;
          I.copy(n), I.vsub(E, I), I.vsub(O, I), I.vsub(s, I);
          const J = Math.abs(D), Q = I.length();
          if (J < g[H].length() && Q < h) {
            if (d)
              return !0;
            y = !0;
            const B = this.createContactEquation(r, a, e, t, c, l);
            O.vadd(E, B.rj), B.rj.copy(B.rj), I.negate(B.ni), B.ni.normalize(), B.ri.copy(B.rj), B.ri.vadd(s, B.ri), B.ri.vsub(n, B.ri), B.ri.normalize(), B.ri.scale(h, B.ri), B.ri.vadd(n, B.ri), B.ri.vsub(r.position, B.ri), B.rj.vadd(s, B.rj), B.rj.vsub(a.position, B.rj), this.result.push(B), this.createFrictionEquationsFromContact(B, this.frictionResult);
          }
        }
    u.release(P, O, L, E, I);
  }
  planeBox(e, t, n, s, i, o, r, a, c, l, d) {
    return t.convexPolyhedronRepresentation.material = t.material, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, t.convexPolyhedronRepresentation.id = t.id, this.planeConvex(e, t.convexPolyhedronRepresentation, n, s, i, o, r, a, e, t, d);
  }
  convexConvex(e, t, n, s, i, o, r, a, c, l, d, u, g) {
    const h = Jr;
    if (!(n.distanceTo(s) > e.boundingSphereRadius + t.boundingSphereRadius) && e.findSeparatingAxis(t, n, i, s, o, h, u, g)) {
      const y = [], m = ea;
      e.clipAgainstHull(n, i, t, s, o, h, -100, 100, y);
      let v = 0;
      for (let w = 0; w !== y.length; w++) {
        if (d)
          return !0;
        const x = this.createContactEquation(r, a, e, t, c, l), A = x.ri, T = x.rj;
        h.negate(x.ni), y[w].normal.negate(m), m.scale(y[w].depth, m), y[w].point.vadd(m, A), T.copy(y[w].point), A.vsub(n, A), T.vsub(s, T), A.vadd(n, A), A.vsub(r.position, A), T.vadd(s, T), T.vsub(a.position, T), this.result.push(x), v++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(x, this.frictionResult);
      }
      this.enableFrictionReduction && v && this.createFrictionFromAverage(v);
    }
  }
  sphereConvex(e, t, n, s, i, o, r, a, c, l, d) {
    const u = this.v3pool;
    n.vsub(s, jr);
    const g = t.faceNormals, h = t.faces, y = t.vertices, m = e.radius;
    let v = !1;
    for (let w = 0; w !== y.length; w++) {
      const x = y[w], A = Gr;
      o.vmult(x, A), s.vadd(A, A);
      const T = qr;
      if (A.vsub(n, T), T.lengthSquared() < m * m) {
        if (d)
          return !0;
        v = !0;
        const S = this.createContactEquation(r, a, e, t, c, l);
        S.ri.copy(T), S.ri.normalize(), S.ni.copy(S.ri), S.ri.scale(m, S.ri), A.vsub(s, S.rj), S.ri.vadd(n, S.ri), S.ri.vsub(r.position, S.ri), S.rj.vadd(s, S.rj), S.rj.vsub(a.position, S.rj), this.result.push(S), this.createFrictionEquationsFromContact(S, this.frictionResult);
        return;
      }
    }
    for (let w = 0, x = h.length; w !== x && v === !1; w++) {
      const A = g[w], T = h[w], S = Ur;
      o.vmult(A, S);
      const N = Vr;
      o.vmult(y[T[0]], N), N.vadd(s, N);
      const R = Wr;
      S.scale(-m, R), n.vadd(R, R);
      const M = Xr;
      R.vsub(N, M);
      const P = M.dot(S), O = Kr;
      if (n.vsub(N, O), P < 0 && O.dot(S) > 0) {
        const L = [];
        for (let E = 0, I = T.length; E !== I; E++) {
          const C = u.get();
          o.vmult(y[T[E]], C), s.vadd(C, C), L.push(C);
        }
        if (Nr(L, S, n)) {
          if (d)
            return !0;
          v = !0;
          const E = this.createContactEquation(r, a, e, t, c, l);
          S.scale(-m, E.ri), S.negate(E.ni);
          const I = u.get();
          S.scale(-P, I);
          const C = u.get();
          S.scale(-m, C), n.vsub(s, E.rj), E.rj.vadd(C, E.rj), E.rj.vadd(I, E.rj), E.rj.vadd(s, E.rj), E.rj.vsub(a.position, E.rj), E.ri.vadd(n, E.ri), E.ri.vsub(r.position, E.ri), u.release(I), u.release(C), this.result.push(E), this.createFrictionEquationsFromContact(E, this.frictionResult);
          for (let _ = 0, j = L.length; _ !== j; _++)
            u.release(L[_]);
          return;
        } else
          for (let E = 0; E !== T.length; E++) {
            const I = u.get(), C = u.get();
            o.vmult(y[T[(E + 1) % T.length]], I), o.vmult(y[T[(E + 2) % T.length]], C), s.vadd(I, I), s.vadd(C, C);
            const _ = Dr;
            C.vsub(I, _);
            const j = Hr;
            _.unit(j);
            const D = u.get(), H = u.get();
            n.vsub(I, H);
            const J = H.dot(j);
            j.scale(J, D), D.vadd(I, D);
            const Q = u.get();
            if (D.vsub(n, Q), J > 0 && J * J < _.lengthSquared() && Q.lengthSquared() < m * m) {
              if (d)
                return !0;
              const B = this.createContactEquation(r, a, e, t, c, l);
              D.vsub(s, B.rj), D.vsub(n, B.ni), B.ni.normalize(), B.ni.scale(m, B.ri), B.rj.vadd(s, B.rj), B.rj.vsub(a.position, B.rj), B.ri.vadd(n, B.ri), B.ri.vsub(r.position, B.ri), this.result.push(B), this.createFrictionEquationsFromContact(B, this.frictionResult);
              for (let xe = 0, Le = L.length; xe !== Le; xe++)
                u.release(L[xe]);
              u.release(I), u.release(C), u.release(D), u.release(Q), u.release(H);
              return;
            }
            u.release(I), u.release(C), u.release(D), u.release(Q), u.release(H);
          }
        for (let E = 0, I = L.length; E !== I; E++)
          u.release(L[E]);
      }
    }
  }
  planeConvex(e, t, n, s, i, o, r, a, c, l, d) {
    const u = Yr, g = $r;
    g.set(0, 0, 1), i.vmult(g, g);
    let h = 0;
    const y = Zr;
    for (let m = 0; m !== t.vertices.length; m++)
      if (u.copy(t.vertices[m]), o.vmult(u, u), s.vadd(u, u), u.vsub(n, y), g.dot(y) <= 0) {
        if (d)
          return !0;
        const w = this.createContactEquation(r, a, e, t, c, l), x = Qr;
        g.scale(g.dot(y), x), u.vsub(x, x), x.vsub(n, w.ri), w.ni.copy(g), u.vsub(s, w.rj), w.ri.vadd(n, w.ri), w.ri.vsub(r.position, w.ri), w.rj.vadd(s, w.rj), w.rj.vsub(a.position, w.rj), this.result.push(w), h++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(w, this.frictionResult);
      }
    this.enableFrictionReduction && h && this.createFrictionFromAverage(h);
  }
  boxConvex(e, t, n, s, i, o, r, a, c, l, d) {
    return e.convexPolyhedronRepresentation.material = e.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.convexConvex(e.convexPolyhedronRepresentation, t, n, s, i, o, r, a, e, t, d);
  }
  sphereHeightfield(e, t, n, s, i, o, r, a, c, l, d) {
    const u = t.data, g = e.radius, h = t.elementSize, y = da, m = ha;
    G.pointToLocalFrame(s, o, n, m);
    let v = Math.floor((m.x - g) / h) - 1, w = Math.ceil((m.x + g) / h) + 1, x = Math.floor((m.y - g) / h) - 1, A = Math.ceil((m.y + g) / h) + 1;
    if (w < 0 || A < 0 || v > u.length || x > u[0].length)
      return;
    v < 0 && (v = 0), w < 0 && (w = 0), x < 0 && (x = 0), A < 0 && (A = 0), v >= u.length && (v = u.length - 1), w >= u.length && (w = u.length - 1), A >= u[0].length && (A = u[0].length - 1), x >= u[0].length && (x = u[0].length - 1);
    const T = [];
    t.getRectMinMax(v, x, w, A, T);
    const S = T[0], N = T[1];
    if (m.z - g > N || m.z + g < S)
      return;
    const R = this.result;
    for (let M = v; M < w; M++)
      for (let P = x; P < A; P++) {
        const O = R.length;
        let L = !1;
        if (t.getConvexTrianglePillar(M, P, !1), G.pointToWorldFrame(s, o, t.pillarOffset, y), n.distanceTo(y) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (L = this.sphereConvex(e, t.pillarConvex, n, y, i, o, r, a, e, t, d)), d && L || (t.getConvexTrianglePillar(M, P, !0), G.pointToWorldFrame(s, o, t.pillarOffset, y), n.distanceTo(y) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (L = this.sphereConvex(e, t.pillarConvex, n, y, i, o, r, a, e, t, d)), d && L))
          return !0;
        if (R.length - O > 2)
          return;
      }
  }
  boxHeightfield(e, t, n, s, i, o, r, a, c, l, d) {
    return e.convexPolyhedronRepresentation.material = e.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.convexHeightfield(e.convexPolyhedronRepresentation, t, n, s, i, o, r, a, e, t, d);
  }
  convexHeightfield(e, t, n, s, i, o, r, a, c, l, d) {
    const u = t.data, g = t.elementSize, h = e.boundingSphereRadius, y = la, m = ua, v = ca;
    G.pointToLocalFrame(s, o, n, v);
    let w = Math.floor((v.x - h) / g) - 1, x = Math.ceil((v.x + h) / g) + 1, A = Math.floor((v.y - h) / g) - 1, T = Math.ceil((v.y + h) / g) + 1;
    if (x < 0 || T < 0 || w > u.length || A > u[0].length)
      return;
    w < 0 && (w = 0), x < 0 && (x = 0), A < 0 && (A = 0), T < 0 && (T = 0), w >= u.length && (w = u.length - 1), x >= u.length && (x = u.length - 1), T >= u[0].length && (T = u[0].length - 1), A >= u[0].length && (A = u[0].length - 1);
    const S = [];
    t.getRectMinMax(w, A, x, T, S);
    const N = S[0], R = S[1];
    if (!(v.z - h > R || v.z + h < N))
      for (let M = w; M < x; M++)
        for (let P = A; P < T; P++) {
          let O = !1;
          if (t.getConvexTrianglePillar(M, P, !1), G.pointToWorldFrame(s, o, t.pillarOffset, y), n.distanceTo(y) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (O = this.convexConvex(e, t.pillarConvex, n, y, i, o, r, a, null, null, d, m, null)), d && O || (t.getConvexTrianglePillar(M, P, !0), G.pointToWorldFrame(s, o, t.pillarOffset, y), n.distanceTo(y) < t.pillarConvex.boundingSphereRadius + e.boundingSphereRadius && (O = this.convexConvex(e, t.pillarConvex, n, y, i, o, r, a, null, null, d, m, null)), d && O))
            return !0;
        }
  }
  sphereParticle(e, t, n, s, i, o, r, a, c, l, d) {
    const u = ia;
    if (u.set(0, 0, 1), s.vsub(n, u), u.lengthSquared() <= e.radius * e.radius) {
      if (d)
        return !0;
      const h = this.createContactEquation(a, r, t, e, c, l);
      u.normalize(), h.rj.copy(u), h.rj.scale(e.radius, h.rj), h.ni.copy(u), h.ni.negate(h.ni), h.ri.set(0, 0, 0), this.result.push(h), this.createFrictionEquationsFromContact(h, this.frictionResult);
    }
  }
  planeParticle(e, t, n, s, i, o, r, a, c, l, d) {
    const u = ta;
    u.set(0, 0, 1), r.quaternion.vmult(u, u);
    const g = na;
    if (s.vsub(r.position, g), u.dot(g) <= 0) {
      if (d)
        return !0;
      const y = this.createContactEquation(a, r, t, e, c, l);
      y.ni.copy(u), y.ni.negate(y.ni), y.ri.set(0, 0, 0);
      const m = sa;
      u.scale(u.dot(s), m), s.vsub(m, m), y.rj.copy(m), this.result.push(y), this.createFrictionEquationsFromContact(y, this.frictionResult);
    }
  }
  boxParticle(e, t, n, s, i, o, r, a, c, l, d) {
    return e.convexPolyhedronRepresentation.material = e.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.convexParticle(e.convexPolyhedronRepresentation, t, n, s, i, o, r, a, e, t, d);
  }
  convexParticle(e, t, n, s, i, o, r, a, c, l, d) {
    let u = -1;
    const g = ra, h = aa;
    let y = null;
    const m = oa;
    if (m.copy(s), m.vsub(n, m), i.conjugate(qn), qn.vmult(m, m), e.pointIsInside(m)) {
      e.worldVerticesNeedsUpdate && e.computeWorldVertices(n, i), e.worldFaceNormalsNeedsUpdate && e.computeWorldFaceNormals(i);
      for (let v = 0, w = e.faces.length; v !== w; v++) {
        const x = [e.worldVertices[e.faces[v][0]]], A = e.worldFaceNormals[v];
        s.vsub(x[0], Gn);
        const T = -A.dot(Gn);
        if (y === null || Math.abs(T) < Math.abs(y)) {
          if (d)
            return !0;
          y = T, u = v, g.copy(A);
        }
      }
      if (u !== -1) {
        const v = this.createContactEquation(a, r, t, e, c, l);
        g.scale(y, h), h.vadd(s, h), h.vsub(n, h), v.rj.copy(h), g.negate(v.ni), v.ri.set(0, 0, 0);
        const w = v.ri, x = v.rj;
        w.vadd(s, w), w.vsub(a.position, w), x.vadd(n, x), x.vsub(r.position, x), this.result.push(v), this.createFrictionEquationsFromContact(v, this.frictionResult);
      } else
        console.warn("Point found inside convex, but did not find penetrating face!");
    }
  }
  heightfieldCylinder(e, t, n, s, i, o, r, a, c, l, d) {
    return this.convexHeightfield(t, e, s, n, o, i, a, r, c, l, d);
  }
  particleCylinder(e, t, n, s, i, o, r, a, c, l, d) {
    return this.convexParticle(t, e, s, n, o, i, a, r, c, l, d);
  }
  sphereTrimesh(e, t, n, s, i, o, r, a, c, l, d) {
    const u = yr, g = gr, h = wr, y = vr, m = br, v = xr, w = Sr, x = mr, A = fr, T = _r;
    G.pointToLocalFrame(s, o, n, m);
    const S = e.radius;
    w.lowerBound.set(m.x - S, m.y - S, m.z - S), w.upperBound.set(m.x + S, m.y + S, m.z + S), t.getTrianglesInAABB(w, T);
    const N = pr, R = e.radius * e.radius;
    for (let E = 0; E < T.length; E++)
      for (let I = 0; I < 3; I++)
        if (t.getVertex(t.indices[T[E] * 3 + I], N), N.vsub(m, A), A.lengthSquared() <= R) {
          if (x.copy(N), G.pointToWorldFrame(s, o, x, N), N.vsub(n, A), d)
            return !0;
          let C = this.createContactEquation(r, a, e, t, c, l);
          C.ni.copy(A), C.ni.normalize(), C.ri.copy(C.ni), C.ri.scale(e.radius, C.ri), C.ri.vadd(n, C.ri), C.ri.vsub(r.position, C.ri), C.rj.copy(N), C.rj.vsub(a.position, C.rj), this.result.push(C), this.createFrictionEquationsFromContact(C, this.frictionResult);
        }
    for (let E = 0; E < T.length; E++)
      for (let I = 0; I < 3; I++) {
        t.getVertex(t.indices[T[E] * 3 + I], u), t.getVertex(t.indices[T[E] * 3 + (I + 1) % 3], g), g.vsub(u, h), m.vsub(g, v);
        const C = v.dot(h);
        m.vsub(u, v);
        let _ = v.dot(h);
        if (_ > 0 && C < 0 && (m.vsub(u, v), y.copy(h), y.normalize(), _ = v.dot(y), y.scale(_, v), v.vadd(u, v), v.distanceTo(m) < e.radius)) {
          if (d)
            return !0;
          const D = this.createContactEquation(r, a, e, t, c, l);
          v.vsub(m, D.ni), D.ni.normalize(), D.ni.scale(e.radius, D.ri), D.ri.vadd(n, D.ri), D.ri.vsub(r.position, D.ri), G.pointToWorldFrame(s, o, v, v), v.vsub(a.position, D.rj), G.vectorToWorldFrame(o, D.ni, D.ni), G.vectorToWorldFrame(o, D.ri, D.ri), this.result.push(D), this.createFrictionEquationsFromContact(D, this.frictionResult);
        }
      }
    const M = Ar, P = Er, O = Tr, L = dr;
    for (let E = 0, I = T.length; E !== I; E++) {
      t.getTriangleVertices(T[E], M, P, O), t.getNormal(T[E], L), m.vsub(M, v);
      let C = v.dot(L);
      if (L.scale(C, v), m.vsub(v, v), C = v.distanceTo(m), $.pointInTriangle(v, M, P, O) && C < e.radius) {
        if (d)
          return !0;
        let _ = this.createContactEquation(r, a, e, t, c, l);
        v.vsub(m, _.ni), _.ni.normalize(), _.ni.scale(e.radius, _.ri), _.ri.vadd(n, _.ri), _.ri.vsub(r.position, _.ri), G.pointToWorldFrame(s, o, v, v), v.vsub(a.position, _.rj), G.vectorToWorldFrame(o, _.ni, _.ni), G.vectorToWorldFrame(o, _.ri, _.ri), this.result.push(_), this.createFrictionEquationsFromContact(_, this.frictionResult);
      }
    }
    T.length = 0;
  }
  planeTrimesh(e, t, n, s, i, o, r, a, c, l, d) {
    const u = new p(), g = lr;
    g.set(0, 0, 1), i.vmult(g, g);
    for (let h = 0; h < t.vertices.length / 3; h++) {
      t.getVertex(h, u);
      const y = new p();
      y.copy(u), G.pointToWorldFrame(s, o, y, u);
      const m = ur;
      if (u.vsub(n, m), g.dot(m) <= 0) {
        if (d)
          return !0;
        const w = this.createContactEquation(r, a, e, t, c, l);
        w.ni.copy(g);
        const x = hr;
        g.scale(m.dot(g), x), u.vsub(x, x), w.ri.copy(x), w.ri.vsub(r.position, w.ri), w.rj.copy(u), w.rj.vsub(a.position, w.rj), this.result.push(w), this.createFrictionEquationsFromContact(w, this.frictionResult);
      }
    }
  }
  // convexTrimesh(
  //   si: ConvexPolyhedron, sj: Trimesh, xi: Vec3, xj: Vec3, qi: Quaternion, qj: Quaternion,
  //   bi: Body, bj: Body, rsi?: Shape | null, rsj?: Shape | null,
  //   faceListA?: number[] | null, faceListB?: number[] | null,
  // ) {
  //   const sepAxis = convexConvex_sepAxis;
  //   if(xi.distanceTo(xj) > si.boundingSphereRadius + sj.boundingSphereRadius){
  //       return;
  //   }
  //   // Construct a temp hull for each triangle
  //   const hullB = new ConvexPolyhedron();
  //   hullB.faces = [[0,1,2]];
  //   const va = new Vec3();
  //   const vb = new Vec3();
  //   const vc = new Vec3();
  //   hullB.vertices = [
  //       va,
  //       vb,
  //       vc
  //   ];
  //   for (let i = 0; i < sj.indices.length / 3; i++) {
  //       const triangleNormal = new Vec3();
  //       sj.getNormal(i, triangleNormal);
  //       hullB.faceNormals = [triangleNormal];
  //       sj.getTriangleVertices(i, va, vb, vc);
  //       let d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
  //       if(!d){
  //           triangleNormal.scale(-1, triangleNormal);
  //           d = si.testSepAxis(triangleNormal, hullB, xi, qi, xj, qj);
  //           if(!d){
  //               continue;
  //           }
  //       }
  //       const res: ConvexPolyhedronContactPoint[] = [];
  //       const q = convexConvex_q;
  //       si.clipAgainstHull(xi,qi,hullB,xj,qj,triangleNormal,-100,100,res);
  //       for(let j = 0; j !== res.length; j++){
  //           const r = this.createContactEquation(bi,bj,si,sj,rsi,rsj),
  //               ri = r.ri,
  //               rj = r.rj;
  //           r.ni.copy(triangleNormal);
  //           r.ni.negate(r.ni);
  //           res[j].normal.negate(q);
  //           q.mult(res[j].depth, q);
  //           res[j].point.vadd(q, ri);
  //           rj.copy(res[j].point);
  //           // Contact points are in world coordinates. Transform back to relative
  //           ri.vsub(xi,ri);
  //           rj.vsub(xj,rj);
  //           // Make relative to bodies
  //           ri.vadd(xi, ri);
  //           ri.vsub(bi.position, ri);
  //           rj.vadd(xj, rj);
  //           rj.vsub(bj.position, rj);
  //           result.push(r);
  //       }
  //   }
  // }
}
const Re = new p(), ke = new p(), Be = new p(), or = new p(), rr = new p(), ar = new Y(), cr = new Y(), lr = new p(), ur = new p(), hr = new p(), dr = new p(), fr = new p();
new p();
const pr = new p(), mr = new p(), yr = new p(), gr = new p(), wr = new p(), vr = new p(), br = new p(), xr = new p(), Ar = new p(), Er = new p(), Tr = new p(), Sr = new ie(), _r = [], yt = new p(), Hn = new p(), Rr = new p(), Mr = new p(), Cr = new p();
function Nr(f, e, t) {
  let n = null;
  const s = f.length;
  for (let i = 0; i !== s; i++) {
    const o = f[i], r = Rr;
    f[(i + 1) % s].vsub(o, r);
    const a = Mr;
    r.cross(e, a);
    const c = Cr;
    t.vsub(o, c);
    const l = a.dot(c);
    if (n === null || l > 0 && n === !0 || l <= 0 && n === !1) {
      n === null && (n = l > 0);
      continue;
    } else
      return !1;
  }
  return !0;
}
const gt = new p(), Pr = new p(), Ir = new p(), Lr = new p(), Or = [new p(), new p(), new p(), new p(), new p(), new p()], Fr = new p(), zr = new p(), kr = new p(), Br = new p(), jr = new p(), Dr = new p(), Hr = new p(), qr = new p(), Gr = new p(), Ur = new p(), Vr = new p(), Wr = new p(), Xr = new p(), Kr = new p();
new p();
new p();
const Yr = new p(), $r = new p(), Zr = new p(), Qr = new p(), Jr = new p(), ea = new p(), ta = new p(), na = new p(), sa = new p(), ia = new p(), qn = new Y(), oa = new p();
new p();
const ra = new p(), Gn = new p(), aa = new p(), ca = new p(), la = new p(), ua = [0], ha = new p(), da = new p();
class Un {
  /**
   * @todo Remove useless constructor
   */
  constructor() {
    this.current = [], this.previous = [];
  }
  /**
   * getKey
   */
  getKey(e, t) {
    if (t < e) {
      const n = t;
      t = e, e = n;
    }
    return e << 16 | t;
  }
  /**
   * set
   */
  set(e, t) {
    const n = this.getKey(e, t), s = this.current;
    let i = 0;
    for (; n > s[i]; )
      i++;
    if (n !== s[i]) {
      for (let o = s.length - 1; o >= i; o--)
        s[o + 1] = s[o];
      s[i] = n;
    }
  }
  /**
   * tick
   */
  tick() {
    const e = this.current;
    this.current = this.previous, this.previous = e, this.current.length = 0;
  }
  /**
   * getDiff
   */
  getDiff(e, t) {
    const n = this.current, s = this.previous, i = n.length, o = s.length;
    let r = 0;
    for (let a = 0; a < i; a++) {
      let c = !1;
      const l = n[a];
      for (; l > s[r]; )
        r++;
      c = l === s[r], c || Vn(e, l);
    }
    r = 0;
    for (let a = 0; a < o; a++) {
      let c = !1;
      const l = s[a];
      for (; l > n[r]; )
        r++;
      c = n[r] === l, c || Vn(t, l);
    }
  }
}
function Vn(f, e) {
  f.push((e & 4294901760) >> 16, e & 65535);
}
const jt = (f, e) => f < e ? `${f}-${e}` : `${e}-${f}`;
class fa {
  constructor() {
    this.data = {
      keys: []
    };
  }
  /** get */
  get(e, t) {
    const n = jt(e, t);
    return this.data[n];
  }
  /** set */
  set(e, t, n) {
    const s = jt(e, t);
    this.get(e, t) || this.data.keys.push(s), this.data[s] = n;
  }
  /** delete */
  delete(e, t) {
    const n = jt(e, t), s = this.data.keys.indexOf(n);
    s !== -1 && this.data.keys.splice(s, 1), delete this.data[n];
  }
  /** reset */
  reset() {
    const e = this.data, t = e.keys;
    for (; t.length > 0; ) {
      const n = t.pop();
      delete e[n];
    }
  }
}
let pa = class extends As {
  /**
   * Currently / last used timestep. Is set to -1 if not available. This value is updated before each internal step, which means that it is "fresh" inside event callbacks.
   */
  /**
   * Makes bodies go to sleep when they've been inactive.
   * @default false
   */
  /**
   * All the current contacts (instances of ContactEquation) in the world.
   */
  /**
   * How often to normalize quaternions. Set to 0 for every step, 1 for every second etc.. A larger value increases performance. If bodies tend to explode, set to a smaller value (zero to be sure nothing can go wrong).
   * @default 0
   */
  /**
   * Set to true to use fast quaternion normalization. It is often enough accurate to use.
   * If bodies tend to explode, set to false.
   * @default false
   */
  /**
   * The wall-clock time since simulation start.
   */
  /**
   * Number of timesteps taken since start.
   */
  /**
   * Default and last timestep sizes.
   */
  /**
   * The gravity of the world.
   */
  /**
   * Gravity to use when approximating the friction max force (mu*mass*gravity).
   * If undefined, global gravity will be used.
   * Use to enable friction in a World with a null gravity vector (no gravity).
   */
  /**
   * The broadphase algorithm to use.
   * @default NaiveBroadphase
   */
  /**
   * All bodies in this world
   */
  /**
   * True if any bodies are not sleeping, false if every body is sleeping.
   */
  /**
   * The solver algorithm to use.
   * @default GSSolver
   */
  /**
   * collisionMatrix
   */
  /**
   * CollisionMatrix from the previous step.
   */
  /**
   * All added contactmaterials.
   */
  /**
   * Used to look up a ContactMaterial given two instances of Material.
   */
  /**
   * The default material of the bodies.
   */
  /**
   * This contact material is used if no suitable contactmaterial is found for a contact.
   */
  /**
   * Time accumulator for interpolation.
   * @see https://gafferongames.com/game-physics/fix-your-timestep/
   */
  /**
   * Dispatched after a body has been added to the world.
   */
  /**
   * Dispatched after a body has been removed from the world.
   */
  constructor(e) {
    e === void 0 && (e = {}), super(), this.dt = -1, this.allowSleep = !!e.allowSleep, this.contacts = [], this.frictionEquations = [], this.quatNormalizeSkip = e.quatNormalizeSkip !== void 0 ? e.quatNormalizeSkip : 0, this.quatNormalizeFast = e.quatNormalizeFast !== void 0 ? e.quatNormalizeFast : !1, this.time = 0, this.stepnumber = 0, this.default_dt = 1 / 60, this.nextId = 0, this.gravity = new p(), e.gravity && this.gravity.copy(e.gravity), e.frictionGravity && (this.frictionGravity = new p(), this.frictionGravity.copy(e.frictionGravity)), this.broadphase = e.broadphase !== void 0 ? e.broadphase : new Es(), this.bodies = [], this.hasActiveBodies = !1, this.solver = e.solver !== void 0 ? e.solver : new Qo(), this.constraints = [], this.narrowphase = new ir(this), this.collisionMatrix = new Nn(), this.collisionMatrixPrevious = new Nn(), this.bodyOverlapKeeper = new Un(), this.shapeOverlapKeeper = new Un(), this.contactmaterials = [], this.contactMaterialTable = new fa(), this.defaultMaterial = new _t("default"), this.defaultContactMaterial = new St(this.defaultMaterial, this.defaultMaterial, {
      friction: 0.3,
      restitution: 0
    }), this.doProfiling = !1, this.profile = {
      solve: 0,
      makeContactConstraints: 0,
      broadphase: 0,
      integrate: 0,
      narrowphase: 0
    }, this.accumulator = 0, this.subsystems = [], this.addBodyEvent = {
      type: "addBody",
      body: null
    }, this.removeBodyEvent = {
      type: "removeBody",
      body: null
    }, this.idToBodyMap = {}, this.broadphase.setWorld(this);
  }
  /**
   * Get the contact material between materials m1 and m2
   * @return The contact material if it was found.
   */
  getContactMaterial(e, t) {
    return this.contactMaterialTable.get(e.id, t.id);
  }
  /**
   * Store old collision state info
   */
  collisionMatrixTick() {
    const e = this.collisionMatrixPrevious;
    this.collisionMatrixPrevious = this.collisionMatrix, this.collisionMatrix = e, this.collisionMatrix.reset(), this.bodyOverlapKeeper.tick(), this.shapeOverlapKeeper.tick();
  }
  /**
   * Add a constraint to the simulation.
   */
  addConstraint(e) {
    this.constraints.push(e);
  }
  /**
   * Removes a constraint
   */
  removeConstraint(e) {
    const t = this.constraints.indexOf(e);
    t !== -1 && this.constraints.splice(t, 1);
  }
  /**
   * Raycast test
   * @deprecated Use .raycastAll, .raycastClosest or .raycastAny instead.
   */
  rayTest(e, t, n) {
    n instanceof Et ? this.raycastClosest(e, t, {
      skipBackfaces: !0
    }, n) : this.raycastAll(e, t, {
      skipBackfaces: !0
    }, n);
  }
  /**
   * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
   * @return True if any body was hit.
   */
  raycastAll(e, t, n, s) {
    return n === void 0 && (n = {}), n.mode = $.ALL, n.from = e, n.to = t, n.callback = s, Dt.intersectWorld(this, n);
  }
  /**
   * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
   * @return True if any body was hit.
   */
  raycastAny(e, t, n, s) {
    return n === void 0 && (n = {}), n.mode = $.ANY, n.from = e, n.to = t, n.result = s, Dt.intersectWorld(this, n);
  }
  /**
   * Ray cast, and return information of the closest hit.
   * @return True if any body was hit.
   */
  raycastClosest(e, t, n, s) {
    return n === void 0 && (n = {}), n.mode = $.CLOSEST, n.from = e, n.to = t, n.result = s, Dt.intersectWorld(this, n);
  }
  /**
   * Add a rigid body to the simulation.
   * @todo If the simulation has not yet started, why recrete and copy arrays for each body? Accumulate in dynamic arrays in this case.
   * @todo Adding an array of bodies should be possible. This would save some loops too
   */
  addBody(e) {
    this.bodies.includes(e) || (e.index = this.bodies.length, this.bodies.push(e), e.world = this, e.initPosition.copy(e.position), e.initVelocity.copy(e.velocity), e.timeLastSleepy = this.time, e instanceof z && (e.initAngularVelocity.copy(e.angularVelocity), e.initQuaternion.copy(e.quaternion)), this.collisionMatrix.setNumObjects(this.bodies.length), this.addBodyEvent.body = e, this.idToBodyMap[e.id] = e, this.dispatchEvent(this.addBodyEvent));
  }
  /**
   * Remove a rigid body from the simulation.
   */
  removeBody(e) {
    e.world = null;
    const t = this.bodies.length - 1, n = this.bodies, s = n.indexOf(e);
    if (s !== -1) {
      n.splice(s, 1);
      for (let i = 0; i !== n.length; i++)
        n[i].index = i;
      this.collisionMatrix.setNumObjects(t), this.removeBodyEvent.body = e, delete this.idToBodyMap[e.id], this.dispatchEvent(this.removeBodyEvent);
    }
  }
  getBodyById(e) {
    return this.idToBodyMap[e];
  }
  /**
   * @todo Make a faster map
   */
  getShapeById(e) {
    const t = this.bodies;
    for (let n = 0; n < t.length; n++) {
      const s = t[n].shapes;
      for (let i = 0; i < s.length; i++) {
        const o = s[i];
        if (o.id === e)
          return o;
      }
    }
    return null;
  }
  /**
   * Adds a contact material to the World
   */
  addContactMaterial(e) {
    this.contactmaterials.push(e), this.contactMaterialTable.set(e.materials[0].id, e.materials[1].id, e);
  }
  /**
   * Removes a contact material from the World.
   */
  removeContactMaterial(e) {
    const t = this.contactmaterials.indexOf(e);
    t !== -1 && (this.contactmaterials.splice(t, 1), this.contactMaterialTable.delete(e.materials[0].id, e.materials[1].id));
  }
  /**
   * Step the simulation forward keeping track of last called time
   * to be able to step the world at a fixed rate, independently of framerate.
   *
   * @param dt The fixed time step size to use (default: 1 / 60).
   * @param maxSubSteps Maximum number of fixed steps to take per function call (default: 10).
   * @see https://gafferongames.com/post/fix_your_timestep/
   * @example
   *     // Run the simulation independently of framerate every 1 / 60 ms
   *     world.fixedStep()
   */
  fixedStep(e, t) {
    e === void 0 && (e = 1 / 60), t === void 0 && (t = 10);
    const n = Z.now() / 1e3;
    if (!this.lastCallTime)
      this.step(e, void 0, t);
    else {
      const s = n - this.lastCallTime;
      this.step(e, s, t);
    }
    this.lastCallTime = n;
  }
  /**
   * Step the physics world forward in time.
   *
   * There are two modes. The simple mode is fixed timestepping without interpolation. In this case you only use the first argument. The second case uses interpolation. In that you also provide the time since the function was last used, as well as the maximum fixed timesteps to take.
   *
   * @param dt The fixed time step size to use.
   * @param timeSinceLastCalled The time elapsed since the function was last called.
   * @param maxSubSteps Maximum number of fixed steps to take per function call (default: 10).
   * @see https://web.archive.org/web/20180426154531/http://bulletphysics.org/mediawiki-1.5.8/index.php/Stepping_The_World#What_do_the_parameters_to_btDynamicsWorld::stepSimulation_mean.3F
   * @example
   *     // fixed timestepping without interpolation
   *     world.step(1 / 60)
   */
  step(e, t, n) {
    if (n === void 0 && (n = 10), t === void 0)
      this.internalStep(e), this.time += e;
    else {
      this.accumulator += t;
      const s = Z.now();
      let i = 0;
      for (; this.accumulator >= e && i < n && (this.internalStep(e), this.accumulator -= e, i++, !(Z.now() - s > e * 1e3)); )
        ;
      this.accumulator = this.accumulator % e;
      const o = this.accumulator / e;
      for (let r = 0; r !== this.bodies.length; r++) {
        const a = this.bodies[r];
        a.previousPosition.lerp(a.position, o, a.interpolatedPosition), a.previousQuaternion.slerp(a.quaternion, o, a.interpolatedQuaternion), a.previousQuaternion.normalize();
      }
      this.time += t;
    }
  }
  internalStep(e) {
    this.dt = e;
    const t = this.contacts, n = va, s = ba, i = this.bodies.length, o = this.bodies, r = this.solver, a = this.gravity, c = this.doProfiling, l = this.profile, d = z.DYNAMIC;
    let u = -1 / 0;
    const g = this.constraints, h = wa;
    a.length();
    const y = a.x, m = a.y, v = a.z;
    let w = 0;
    for (c && (u = Z.now()), w = 0; w !== i; w++) {
      const E = o[w];
      if (E.type === d) {
        const I = E.force, C = E.mass;
        I.x += C * y, I.y += C * m, I.z += C * v;
      }
    }
    for (let E = 0, I = this.subsystems.length; E !== I; E++)
      this.subsystems[E].update();
    c && (u = Z.now()), n.length = 0, s.length = 0, this.broadphase.collisionPairs(this, n, s), c && (l.broadphase = Z.now() - u);
    let x = g.length;
    for (w = 0; w !== x; w++) {
      const E = g[w];
      if (!E.collideConnected)
        for (let I = n.length - 1; I >= 0; I -= 1)
          (E.bodyA === n[I] && E.bodyB === s[I] || E.bodyB === n[I] && E.bodyA === s[I]) && (n.splice(I, 1), s.splice(I, 1));
    }
    this.collisionMatrixTick(), c && (u = Z.now());
    const A = ga, T = t.length;
    for (w = 0; w !== T; w++)
      A.push(t[w]);
    t.length = 0;
    const S = this.frictionEquations.length;
    for (w = 0; w !== S; w++)
      h.push(this.frictionEquations[w]);
    for (this.frictionEquations.length = 0, this.narrowphase.getContacts(
      n,
      s,
      this,
      t,
      A,
      // To be reused
      this.frictionEquations,
      h
    ), c && (l.narrowphase = Z.now() - u), c && (u = Z.now()), w = 0; w < this.frictionEquations.length; w++)
      r.addEquation(this.frictionEquations[w]);
    const N = t.length;
    for (let E = 0; E !== N; E++) {
      const I = t[E], C = I.bi, _ = I.bj, j = I.si, D = I.sj;
      let H;
      if (C.material && _.material ? H = this.getContactMaterial(C.material, _.material) || this.defaultContactMaterial : H = this.defaultContactMaterial, H.friction, C.material && _.material && (C.material.friction >= 0 && _.material.friction >= 0 && C.material.friction * _.material.friction, C.material.restitution >= 0 && _.material.restitution >= 0 && (I.restitution = C.material.restitution * _.material.restitution)), r.addEquation(I), C.allowSleep && C.type === z.DYNAMIC && C.sleepState === z.SLEEPING && _.sleepState === z.AWAKE && _.type !== z.STATIC) {
        const J = _.velocity.lengthSquared() + _.angularVelocity.lengthSquared(), Q = _.sleepSpeedLimit ** 2;
        J >= Q * 2 && (C.wakeUpAfterNarrowphase = !0);
      }
      if (_.allowSleep && _.type === z.DYNAMIC && _.sleepState === z.SLEEPING && C.sleepState === z.AWAKE && C.type !== z.STATIC) {
        const J = C.velocity.lengthSquared() + C.angularVelocity.lengthSquared(), Q = C.sleepSpeedLimit ** 2;
        J >= Q * 2 && (_.wakeUpAfterNarrowphase = !0);
      }
      this.collisionMatrix.set(C, _, !0), this.collisionMatrixPrevious.get(C, _) || (Ze.body = _, Ze.contact = I, C.dispatchEvent(Ze), Ze.body = C, _.dispatchEvent(Ze)), this.bodyOverlapKeeper.set(C.id, _.id), this.shapeOverlapKeeper.set(j.id, D.id);
    }
    for (this.emitContactEvents(), c && (l.makeContactConstraints = Z.now() - u, u = Z.now()), w = 0; w !== i; w++) {
      const E = o[w];
      E.wakeUpAfterNarrowphase && (E.wakeUp(), E.wakeUpAfterNarrowphase = !1);
    }
    for (x = g.length, w = 0; w !== x; w++) {
      const E = g[w];
      E.update();
      for (let I = 0, C = E.equations.length; I !== C; I++) {
        const _ = E.equations[I];
        r.addEquation(_);
      }
    }
    r.solve(e, this), c && (l.solve = Z.now() - u), r.removeAllEquations();
    const R = Math.pow;
    for (w = 0; w !== i; w++) {
      const E = o[w];
      if (E.type & d) {
        const I = R(1 - E.linearDamping, e), C = E.velocity;
        C.scale(I, C);
        const _ = E.angularVelocity;
        if (_) {
          const j = R(1 - E.angularDamping, e);
          _.scale(j, _);
        }
      }
    }
    this.dispatchEvent(ya), c && (u = Z.now());
    const P = this.stepnumber % (this.quatNormalizeSkip + 1) === 0, O = this.quatNormalizeFast;
    for (w = 0; w !== i; w++)
      o[w].integrate(e, P, O);
    this.clearForces(), this.broadphase.dirty = !0, c && (l.integrate = Z.now() - u), this.stepnumber += 1, this.dispatchEvent(ma);
    let L = !0;
    if (this.allowSleep)
      for (L = !1, w = 0; w !== i; w++) {
        const E = o[w];
        E.sleepTick(this.time), E.sleepState !== z.SLEEPING && (L = !0);
      }
    this.hasActiveBodies = L;
  }
  emitContactEvents() {
    const e = this.hasAnyEventListener("beginContact"), t = this.hasAnyEventListener("endContact");
    if ((e || t) && this.bodyOverlapKeeper.getDiff(me, ye), e) {
      for (let i = 0, o = me.length; i < o; i += 2)
        Qe.bodyA = this.getBodyById(me[i]), Qe.bodyB = this.getBodyById(me[i + 1]), this.dispatchEvent(Qe);
      Qe.bodyA = Qe.bodyB = null;
    }
    if (t) {
      for (let i = 0, o = ye.length; i < o; i += 2)
        Je.bodyA = this.getBodyById(ye[i]), Je.bodyB = this.getBodyById(ye[i + 1]), this.dispatchEvent(Je);
      Je.bodyA = Je.bodyB = null;
    }
    me.length = ye.length = 0;
    const n = this.hasAnyEventListener("beginShapeContact"), s = this.hasAnyEventListener("endShapeContact");
    if ((n || s) && this.shapeOverlapKeeper.getDiff(me, ye), n) {
      for (let i = 0, o = me.length; i < o; i += 2) {
        const r = this.getShapeById(me[i]), a = this.getShapeById(me[i + 1]);
        ge.shapeA = r, ge.shapeB = a, r && (ge.bodyA = r.body), a && (ge.bodyB = a.body), this.dispatchEvent(ge);
      }
      ge.bodyA = ge.bodyB = ge.shapeA = ge.shapeB = null;
    }
    if (s) {
      for (let i = 0, o = ye.length; i < o; i += 2) {
        const r = this.getShapeById(ye[i]), a = this.getShapeById(ye[i + 1]);
        we.shapeA = r, we.shapeB = a, r && (we.bodyA = r.body), a && (we.bodyB = a.body), this.dispatchEvent(we);
      }
      we.bodyA = we.bodyB = we.shapeA = we.shapeB = null;
    }
  }
  /**
   * Sets all body forces in the world to zero.
   */
  clearForces() {
    const e = this.bodies, t = e.length;
    for (let n = 0; n !== t; n++) {
      const s = e[n];
      s.force, s.torque, s.force.set(0, 0, 0), s.torque.set(0, 0, 0);
    }
  }
};
new ie();
const Dt = new $(), Z = globalThis.performance || {};
if (!Z.now) {
  let f = Date.now();
  Z.timing && Z.timing.navigationStart && (f = Z.timing.navigationStart), Z.now = () => Date.now() - f;
}
new p();
const ma = {
  type: "postStep"
}, ya = {
  type: "preStep"
}, Ze = {
  type: z.COLLIDE_EVENT_NAME,
  body: null,
  contact: null
}, ga = [], wa = [], va = [], ba = [], me = [], ye = [], Qe = {
  type: "beginContact",
  bodyA: null,
  bodyB: null
}, Je = {
  type: "endContact",
  bodyA: null,
  bodyB: null
}, ge = {
  type: "beginShapeContact",
  bodyA: null,
  bodyB: null,
  shapeA: null,
  shapeB: null
}, we = {
  type: "endShapeContact",
  bodyA: null,
  bodyB: null,
  shapeA: null,
  shapeB: null
};
function xa(f, e, t) {
  let {
    color: n = 65280,
    scale: s = 1,
    onInit: i,
    onUpdate: o
  } = t === void 0 ? {} : t;
  const r = [], a = new _e({
    color: n ?? 65280,
    wireframe: !0
  }), c = new p(), l = new p(), d = new p(), u = new Y(), g = new rt(1), h = new Ge(1, 1, 1), y = new wn(10, 10, 10, 10);
  y.translate(0, 0, 1e-4);
  function m(R) {
    const M = new He(), P = [];
    for (let L = 0; L < R.vertices.length; L++) {
      const E = R.vertices[L];
      P.push(E.x, E.y, E.z);
    }
    M.setAttribute("position", new Pt(P, 3));
    const O = [];
    for (let L = 0; L < R.faces.length; L++) {
      const E = R.faces[L], I = E[0];
      for (let C = 1; C < E.length - 1; C++) {
        const _ = E[C], j = E[C + 1];
        O.push(I, _, j);
      }
    }
    return M.setIndex(O), M.computeBoundingSphere(), M.computeVertexNormals(), M;
  }
  function v(R) {
    const M = new He(), P = [], O = c, L = l, E = d;
    for (let I = 0; I < R.indices.length / 3; I++)
      R.getTriangleVertices(I, O, L, E), P.push(O.x, O.y, O.z), P.push(L.x, L.y, L.z), P.push(E.x, E.y, E.z);
    return M.setAttribute("position", new Pt(P, 3)), M.computeBoundingSphere(), M.computeVertexNormals(), M;
  }
  function w(R) {
    const M = new He(), P = R.elementSize || 1, O = R.data.flatMap((E, I) => E.flatMap((C, _) => [I * P, _ * P, C])), L = [];
    for (let E = 0; E < R.data.length - 1; E++)
      for (let I = 0; I < R.data[E].length - 1; I++) {
        const C = R.data[E].length, _ = E * C + I;
        L.push(_ + 1, _ + C, _ + C + 1), L.push(_ + C, _ + 1, _);
      }
    return M.setIndex(L), M.setAttribute("position", new Pt(O, 3)), M.computeBoundingSphere(), M.computeVertexNormals(), M;
  }
  function x(R) {
    let M = new ne();
    const {
      SPHERE: P,
      BOX: O,
      PLANE: L,
      CYLINDER: E,
      CONVEXPOLYHEDRON: I,
      TRIMESH: C,
      HEIGHTFIELD: _
    } = F.types;
    switch (R.type) {
      case P: {
        M = new ne(g, a);
        break;
      }
      case O: {
        M = new ne(h, a);
        break;
      }
      case L: {
        M = new ne(y, a);
        break;
      }
      case E: {
        const j = new fs(R.radiusTop, R.radiusBottom, R.height, R.numSegments);
        M = new ne(j, a), R.geometryId = j.id;
        break;
      }
      case I: {
        const j = m(R);
        M = new ne(j, a), R.geometryId = j.id;
        break;
      }
      case C: {
        const j = v(R);
        M = new ne(j, a), R.geometryId = j.id;
        break;
      }
      case _: {
        const j = w(R);
        M = new ne(j, a), R.geometryId = j.id;
        break;
      }
    }
    return f.add(M), M;
  }
  function A(R, M) {
    const {
      SPHERE: P,
      BOX: O,
      PLANE: L,
      CYLINDER: E,
      CONVEXPOLYHEDRON: I,
      TRIMESH: C,
      HEIGHTFIELD: _
    } = F.types;
    switch (M.type) {
      case P: {
        const {
          radius: j
        } = M;
        R.scale.set(j * s, j * s, j * s);
        break;
      }
      case O: {
        R.scale.copy(M.halfExtents), R.scale.multiplyScalar(2 * s);
        break;
      }
      case L:
        break;
      case E: {
        R.scale.set(1 * s, 1 * s, 1 * s);
        break;
      }
      case I: {
        R.scale.set(1 * s, 1 * s, 1 * s);
        break;
      }
      case C: {
        R.scale.copy(M.scale).multiplyScalar(s);
        break;
      }
      case _: {
        R.scale.set(1 * s, 1 * s, 1 * s);
        break;
      }
    }
  }
  function T(R, M) {
    if (!R)
      return !1;
    const {
      geometry: P
    } = R;
    return P instanceof rt && M.type === F.types.SPHERE || P instanceof Ge && M.type === F.types.BOX || P instanceof wn && M.type === F.types.PLANE || P.id === M.geometryId && M.type === F.types.CYLINDER || P.id === M.geometryId && M.type === F.types.CONVEXPOLYHEDRON || P.id === M.geometryId && M.type === F.types.TRIMESH || P.id === M.geometryId && M.type === F.types.HEIGHTFIELD;
  }
  function S(R, M) {
    let P = r[R], O = !1;
    return T(P, M) || (P && f.remove(P), r[R] = P = x(M), O = !0), A(P, M), O;
  }
  function N() {
    const R = r, M = c, P = u;
    let O = 0;
    for (const L of e.bodies)
      for (let E = 0; E !== L.shapes.length; E++) {
        const I = L.shapes[E], C = S(O, I), _ = R[O];
        _ && (L.quaternion.vmult(L.shapeOffsets[E], M), L.position.vadd(M, M), L.quaternion.mult(L.shapeOrientations[E], P), _.position.copy(M), _.quaternion.copy(P), C && i instanceof Function && i(L, _, I), !C && o instanceof Function && o(L, _, I)), O++;
      }
    for (let L = O; L < R.length; L++) {
      const E = R[L];
      E && f.remove(E);
    }
    R.length = O;
  }
  return {
    update: N
  };
}
function Wn(f, e) {
  if (e === ci)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), f;
  if (e === Wt || e === ps) {
    let t = f.getIndex();
    if (t === null) {
      const o = [], r = f.getAttribute("position");
      if (r !== void 0) {
        for (let a = 0; a < r.count; a++)
          o.push(a);
        f.setIndex(o), t = f.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), f;
    }
    const n = t.count - 2, s = [];
    if (e === Wt)
      for (let o = 1; o <= n; o++)
        s.push(t.getX(0)), s.push(t.getX(o)), s.push(t.getX(o + 1));
    else
      for (let o = 0; o < n; o++)
        o % 2 === 0 ? (s.push(t.getX(o)), s.push(t.getX(o + 1)), s.push(t.getX(o + 2))) : (s.push(t.getX(o + 2)), s.push(t.getX(o + 1)), s.push(t.getX(o)));
    s.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = f.clone();
    return i.setIndex(s), i.clearGroups(), i;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), f;
}
class on extends ms {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new _a(t);
    }), this.register(function(t) {
      return new Fa(t);
    }), this.register(function(t) {
      return new za(t);
    }), this.register(function(t) {
      return new ka(t);
    }), this.register(function(t) {
      return new Ma(t);
    }), this.register(function(t) {
      return new Ca(t);
    }), this.register(function(t) {
      return new Na(t);
    }), this.register(function(t) {
      return new Pa(t);
    }), this.register(function(t) {
      return new Sa(t);
    }), this.register(function(t) {
      return new Ia(t);
    }), this.register(function(t) {
      return new Ra(t);
    }), this.register(function(t) {
      return new Oa(t);
    }), this.register(function(t) {
      return new La(t);
    }), this.register(function(t) {
      return new Ea(t);
    }), this.register(function(t) {
      return new Ba(t);
    }), this.register(function(t) {
      return new ja(t);
    });
  }
  load(e, t, n, s) {
    const i = this;
    let o;
    if (this.resourcePath !== "")
      o = this.resourcePath;
    else if (this.path !== "") {
      const c = tt.extractUrlBase(e);
      o = tt.resolveURL(c, this.path);
    } else
      o = tt.extractUrlBase(e);
    this.manager.itemStart(e);
    const r = function(c) {
      s ? s(c) : console.error(c), i.manager.itemError(e), i.manager.itemEnd(e);
    }, a = new At(this.manager);
    a.setPath(this.path), a.setResponseType("arraybuffer"), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function(c) {
      try {
        i.parse(c, o, function(l) {
          t(l), i.manager.itemEnd(e);
        }, r);
      } catch (l) {
        r(l);
      }
    }, n, r);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, n, s) {
    let i;
    const o = {}, r = {}, a = new TextDecoder();
    if (typeof e == "string")
      i = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (a.decode(new Uint8Array(e, 0, 4)) === Ps) {
        try {
          o[q.KHR_BINARY_GLTF] = new Da(e);
        } catch (d) {
          s && s(d);
          return;
        }
        i = JSON.parse(o[q.KHR_BINARY_GLTF].content);
      } else
        i = JSON.parse(a.decode(e));
    else
      i = e;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Ja(i, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let l = 0; l < this.pluginCallbacks.length; l++) {
      const d = this.pluginCallbacks[l](c);
      d.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), r[d.name] = d, o[d.name] = !0;
    }
    if (i.extensionsUsed)
      for (let l = 0; l < i.extensionsUsed.length; ++l) {
        const d = i.extensionsUsed[l], u = i.extensionsRequired || [];
        switch (d) {
          case q.KHR_MATERIALS_UNLIT:
            o[d] = new Ta();
            break;
          case q.KHR_DRACO_MESH_COMPRESSION:
            o[d] = new Ha(i, this.dracoLoader);
            break;
          case q.KHR_TEXTURE_TRANSFORM:
            o[d] = new qa();
            break;
          case q.KHR_MESH_QUANTIZATION:
            o[d] = new Ga();
            break;
          default:
            u.indexOf(d) >= 0 && r[d] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + d + '".');
        }
      }
    c.setExtensions(o), c.setPlugins(r), c.parse(n, s);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(s, i) {
      n.parse(e, t, s, i);
    });
  }
}
function Aa() {
  let f = {};
  return {
    get: function(e) {
      return f[e];
    },
    add: function(e, t) {
      f[e] = t;
    },
    remove: function(e) {
      delete f[e];
    },
    removeAll: function() {
      f = {};
    }
  };
}
const q = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Ea {
  constructor(e) {
    this.parser = e, this.name = q.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let n = 0, s = t.length; n < s; n++) {
      const i = t[n];
      i.extensions && i.extensions[this.name] && i.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, i.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, n = "light:" + e;
    let s = t.cache.get(n);
    if (s)
      return s;
    const i = t.json, a = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e];
    let c;
    const l = new ve(16777215);
    a.color !== void 0 && l.setRGB(a.color[0], a.color[1], a.color[2], de);
    const d = a.range !== void 0 ? a.range : 0;
    switch (a.type) {
      case "directional":
        c = new hi(l), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new ui(l), c.distance = d;
        break;
      case "spot":
        c = new li(l), c.distance = d, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle !== void 0 ? a.spot.innerConeAngle : 0, a.spot.outerConeAngle = a.spot.outerConeAngle !== void 0 ? a.spot.outerConeAngle : Math.PI / 4, c.angle = a.spot.outerConeAngle, c.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, Se(c, a), a.intensity !== void 0 && (c.intensity = a.intensity), c.name = t.createUniqueName(a.name || "light_" + e), s = Promise.resolve(c), t.cache.add(n, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, n = this.parser, i = n.json.nodes[e], r = (i.extensions && i.extensions[this.name] || {}).light;
    return r === void 0 ? null : this._loadLight(r).then(function(a) {
      return n._getNodeRef(t.cache, r, a);
    });
  }
}
class Ta {
  constructor() {
    this.name = q.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return _e;
  }
  extendParams(e, t, n) {
    const s = [];
    e.color = new ve(1, 1, 1), e.opacity = 1;
    const i = t.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        const o = i.baseColorFactor;
        e.color.setRGB(o[0], o[1], o[2], de), e.opacity = o[3];
      }
      i.baseColorTexture !== void 0 && s.push(n.assignTexture(e, "map", i.baseColorTexture, Pe));
    }
    return Promise.all(s);
  }
}
class Sa {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = s.extensions[this.name].emissiveStrength;
    return i !== void 0 && (t.emissiveIntensity = i), Promise.resolve();
  }
}
class _a {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], o = s.extensions[this.name];
    if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && i.push(n.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && i.push(n.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (i.push(n.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
      const r = o.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new se(r, r);
    }
    return Promise.all(i);
  }
}
class Ra {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], o = s.extensions[this.name];
    return o.iridescenceFactor !== void 0 && (t.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && i.push(n.assignTexture(t, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (t.iridescenceIOR = o.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && i.push(n.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(i);
  }
}
class Ma {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [];
    t.sheenColor = new ve(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const o = s.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      const r = o.sheenColorFactor;
      t.sheenColor.setRGB(r[0], r[1], r[2], de);
    }
    return o.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && i.push(n.assignTexture(t, "sheenColorMap", o.sheenColorTexture, Pe)), o.sheenRoughnessTexture !== void 0 && i.push(n.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(i);
  }
}
class Ca {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], o = s.extensions[this.name];
    return o.transmissionFactor !== void 0 && (t.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && i.push(n.assignTexture(t, "transmissionMap", o.transmissionTexture)), Promise.all(i);
  }
}
class Na {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], o = s.extensions[this.name];
    t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && i.push(n.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0;
    const r = o.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new ve().setRGB(r[0], r[1], r[2], de), Promise.all(i);
  }
}
class Pa {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = s.extensions[this.name];
    return t.ior = i.ior !== void 0 ? i.ior : 1.5, Promise.resolve();
  }
}
class Ia {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], o = s.extensions[this.name];
    t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && i.push(n.assignTexture(t, "specularIntensityMap", o.specularTexture));
    const r = o.specularColorFactor || [1, 1, 1];
    return t.specularColor = new ve().setRGB(r[0], r[1], r[2], de), o.specularColorTexture !== void 0 && i.push(n.assignTexture(t, "specularColorMap", o.specularColorTexture, Pe)), Promise.all(i);
  }
}
class La {
  constructor(e) {
    this.parser = e, this.name = q.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], o = s.extensions[this.name];
    return t.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && i.push(n.assignTexture(t, "bumpMap", o.bumpTexture)), Promise.all(i);
  }
}
class Oa {
  constructor(e) {
    this.parser = e, this.name = q.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : be;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const i = [], o = s.extensions[this.name];
    return o.anisotropyStrength !== void 0 && (t.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (t.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && i.push(n.assignTexture(t, "anisotropyMap", o.anisotropyTexture)), Promise.all(i);
  }
}
class Fa {
  constructor(e) {
    this.parser = e, this.name = q.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, n = t.json, s = n.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const i = s.extensions[this.name], o = t.options.ktx2Loader;
    if (!o) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, i.source, o);
  }
}
class za {
  constructor(e) {
    this.parser = e, this.name = q.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[t])
      return null;
    const o = i.extensions[t], r = s.images[o.source];
    let a = n.textureLoader;
    if (r.uri) {
      const c = n.options.manager.getHandler(r.uri);
      c !== null && (a = c);
    }
    return this.detectSupport().then(function(c) {
      if (c)
        return n.loadTextureImage(e, o.source, a);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class ka {
  constructor(e) {
    this.parser = e, this.name = q.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, i = s.textures[e];
    if (!i.extensions || !i.extensions[t])
      return null;
    const o = i.extensions[t], r = s.images[o.source];
    let a = n.textureLoader;
    if (r.uri) {
      const c = n.options.manager.getHandler(r.uri);
      c !== null && (a = c);
    }
    return this.detectSupport().then(function(c) {
      if (c)
        return n.loadTextureImage(e, o.source, a);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Ba {
  constructor(e) {
    this.name = q.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, n = t.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const s = n.extensions[this.name], i = this.parser.getDependency("buffer", s.buffer), o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return i.then(function(r) {
        const a = s.byteOffset || 0, c = s.byteLength || 0, l = s.count, d = s.byteStride, u = new Uint8Array(r, a, c);
        return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(l, d, u, s.mode, s.filter).then(function(g) {
          return g.buffer;
        }) : o.ready.then(function() {
          const g = new ArrayBuffer(l * d);
          return o.decodeGltfBuffer(new Uint8Array(g), l, d, u, s.mode, s.filter), g;
        });
      });
    } else
      return null;
  }
}
class ja {
  constructor(e) {
    this.name = q.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = t.meshes[n.mesh];
    for (const c of s.primitives)
      if (c.mode !== re.TRIANGLES && c.mode !== re.TRIANGLE_STRIP && c.mode !== re.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const o = n.extensions[this.name].attributes, r = [], a = {};
    for (const c in o)
      r.push(this.parser.getDependency("accessor", o[c]).then((l) => (a[c] = l, a[c])));
    return r.length < 1 ? null : (r.push(this.parser.createNodeMesh(e)), Promise.all(r).then((c) => {
      const l = c.pop(), d = l.isGroup ? l.children : [l], u = c[0].count, g = [];
      for (const h of d) {
        const y = new Ue(), m = new X(), v = new xt(), w = new X(1, 1, 1), x = new ys(h.geometry, h.material, u);
        for (let A = 0; A < u; A++)
          a.TRANSLATION && m.fromBufferAttribute(a.TRANSLATION, A), a.ROTATION && v.fromBufferAttribute(a.ROTATION, A), a.SCALE && w.fromBufferAttribute(a.SCALE, A), x.setMatrixAt(A, y.compose(m, v, w));
        for (const A in a)
          if (A === "_COLOR_0") {
            const T = a[A];
            x.instanceColor = new di(T.array, T.itemSize, T.normalized);
          } else
            A !== "TRANSLATION" && A !== "ROTATION" && A !== "SCALE" && h.geometry.setAttribute(A, a[A]);
        at.prototype.copy.call(x, h), this.parser.assignFinalMaterial(x), g.push(x);
      }
      return l.isGroup ? (l.clear(), l.add(...g), l) : g[0];
    }));
  }
}
const Ps = "glTF", et = 12, Xn = { JSON: 1313821514, BIN: 5130562 };
class Da {
  constructor(e) {
    this.name = q.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, et), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Ps)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - et, i = new DataView(e, et);
    let o = 0;
    for (; o < s; ) {
      const r = i.getUint32(o, !0);
      o += 4;
      const a = i.getUint32(o, !0);
      if (o += 4, a === Xn.JSON) {
        const c = new Uint8Array(e, et + o, r);
        this.content = n.decode(c);
      } else if (a === Xn.BIN) {
        const c = et + o;
        this.body = e.slice(c, c + r);
      }
      o += r;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Ha {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = q.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const n = this.json, s = this.dracoLoader, i = e.extensions[this.name].bufferView, o = e.extensions[this.name].attributes, r = {}, a = {}, c = {};
    for (const l in o) {
      const d = Kt[l] || l.toLowerCase();
      r[d] = o[l];
    }
    for (const l in e.attributes) {
      const d = Kt[l] || l.toLowerCase();
      if (o[l] !== void 0) {
        const u = n.accessors[e.attributes[l]], g = qe[u.componentType];
        c[d] = g.name, a[d] = u.normalized === !0;
      }
    }
    return t.getDependency("bufferView", i).then(function(l) {
      return new Promise(function(d, u) {
        s.decodeDracoFile(l, function(g) {
          for (const h in g.attributes) {
            const y = g.attributes[h], m = a[h];
            m !== void 0 && (y.normalized = m);
          }
          d(g);
        }, r, c, de, u);
      });
    });
  }
}
class qa {
  constructor() {
    this.name = q.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Ga {
  constructor() {
    this.name = q.KHR_MESH_QUANTIZATION;
  }
}
class Is extends ji {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, i = e * s * 3 + s;
    for (let o = 0; o !== s; o++)
      t[o] = n[i + o];
    return t;
  }
  interpolate_(e, t, n, s) {
    const i = this.resultBuffer, o = this.sampleValues, r = this.valueSize, a = r * 2, c = r * 3, l = s - t, d = (n - t) / l, u = d * d, g = u * d, h = e * c, y = h - c, m = -2 * g + 3 * u, v = g - u, w = 1 - m, x = v - u + d;
    for (let A = 0; A !== r; A++) {
      const T = o[y + A + r], S = o[y + A + a] * l, N = o[h + A + r], R = o[h + A] * l;
      i[A] = w * T + x * S + m * N + v * R;
    }
    return i;
  }
}
const Ua = new xt();
class Va extends Is {
  interpolate_(e, t, n, s) {
    const i = super.interpolate_(e, t, n, s);
    return Ua.fromArray(i).normalize().toArray(i), i;
  }
}
const re = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, qe = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Kn = {
  9728: Ci,
  9729: gs,
  9984: Ni,
  9985: Pi,
  9986: Ii,
  9987: ws
}, Yn = {
  33071: Li,
  33648: Oi,
  10497: Xt
}, Ht = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Kt = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, Te = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Wa = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: xs,
  STEP: Fi
}, qt = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Xa(f) {
  return f.DefaultMaterial === void 0 && (f.DefaultMaterial = new ct({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: zi
  })), f.DefaultMaterial;
}
function Me(f, e, t) {
  for (const n in t.extensions)
    f[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]);
}
function Se(f, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(f.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Ka(f, e, t) {
  let n = !1, s = !1, i = !1;
  for (let c = 0, l = e.length; c < l; c++) {
    const d = e[c];
    if (d.POSITION !== void 0 && (n = !0), d.NORMAL !== void 0 && (s = !0), d.COLOR_0 !== void 0 && (i = !0), n && s && i)
      break;
  }
  if (!n && !s && !i)
    return Promise.resolve(f);
  const o = [], r = [], a = [];
  for (let c = 0, l = e.length; c < l; c++) {
    const d = e[c];
    if (n) {
      const u = d.POSITION !== void 0 ? t.getDependency("accessor", d.POSITION) : f.attributes.position;
      o.push(u);
    }
    if (s) {
      const u = d.NORMAL !== void 0 ? t.getDependency("accessor", d.NORMAL) : f.attributes.normal;
      r.push(u);
    }
    if (i) {
      const u = d.COLOR_0 !== void 0 ? t.getDependency("accessor", d.COLOR_0) : f.attributes.color;
      a.push(u);
    }
  }
  return Promise.all([
    Promise.all(o),
    Promise.all(r),
    Promise.all(a)
  ]).then(function(c) {
    const l = c[0], d = c[1], u = c[2];
    return n && (f.morphAttributes.position = l), s && (f.morphAttributes.normal = d), i && (f.morphAttributes.color = u), f.morphTargetsRelative = !0, f;
  });
}
function Ya(f, e) {
  if (f.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, n = e.weights.length; t < n; t++)
      f.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (f.morphTargetInfluences.length === t.length) {
      f.morphTargetDictionary = {};
      for (let n = 0, s = t.length; n < s; n++)
        f.morphTargetDictionary[t[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function $a(f) {
  let e;
  const t = f.extensions && f.extensions[q.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Gt(t.attributes) : e = f.indices + ":" + Gt(f.attributes) + ":" + f.mode, f.targets !== void 0)
    for (let n = 0, s = f.targets.length; n < s; n++)
      e += ":" + Gt(f.targets[n]);
  return e;
}
function Gt(f) {
  let e = "";
  const t = Object.keys(f).sort();
  for (let n = 0, s = t.length; n < s; n++)
    e += t[n] + ":" + f[t[n]] + ";";
  return e;
}
function Yt(f) {
  switch (f) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Za(f) {
  return f.search(/\.jpe?g($|\?)/i) > 0 || f.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : f.search(/\.webp($|\?)/i) > 0 || f.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Qa = new Ue();
class Ja {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Aa(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = !1, i = -1;
    typeof navigator < "u" && (n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, s = navigator.userAgent.indexOf("Firefox") > -1, i = s ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || n || s && i < 98 ? this.textureLoader = new fi(this.options.manager) : this.textureLoader = new pi(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new At(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const n = this, s = this.json, i = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(o) {
      return o._markDefs && o._markDefs();
    }), Promise.all(this._invokeAll(function(o) {
      return o.beforeRoot && o.beforeRoot();
    })).then(function() {
      return Promise.all([
        n.getDependencies("scene"),
        n.getDependencies("animation"),
        n.getDependencies("camera")
      ]);
    }).then(function(o) {
      const r = {
        scene: o[0][s.scene || 0],
        scenes: o[0],
        animations: o[1],
        cameras: o[2],
        asset: s.asset,
        parser: n,
        userData: {}
      };
      return Me(i, r, s), Se(r, s), Promise.all(n._invokeAll(function(a) {
        return a.afterRoot && a.afterRoot(r);
      })).then(function() {
        e(r);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
    for (let s = 0, i = t.length; s < i; s++) {
      const o = t[s].joints;
      for (let r = 0, a = o.length; r < a; r++)
        e[o[r]].isBone = !0;
    }
    for (let s = 0, i = e.length; s < i; s++) {
      const o = e[s];
      o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (n[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, t, n) {
    if (e.refs[t] <= 1)
      return n;
    const s = n.clone(), i = (o, r) => {
      const a = this.associations.get(o);
      a != null && this.associations.set(r, a);
      for (const [c, l] of o.children.entries())
        i(l, r.children[c]);
    };
    return i(n, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let n = 0; n < t.length; n++) {
      const s = e(t[n]);
      if (s)
        return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const n = [];
    for (let s = 0; s < t.length; s++) {
      const i = e(t[s]);
      i && n.push(i);
    }
    return n;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, t) {
    const n = e + ":" + t;
    let s = this.cache.get(n);
    if (!s) {
      switch (e) {
        case "scene":
          s = this.loadScene(t);
          break;
        case "node":
          s = this._invokeOne(function(i) {
            return i.loadNode && i.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(i) {
            return i.loadMesh && i.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(i) {
            return i.loadBufferView && i.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(i) {
            return i.loadMaterial && i.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(i) {
            return i.loadTexture && i.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(i) {
            return i.loadAnimation && i.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(i) {
            return i != this && i.getDependency && i.getDependency(e, t);
          }), !s)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(n, s);
    }
    return s;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const n = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(i, o) {
        return n.getDependency(e, o);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], n = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[q.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(i, o) {
      n.load(tt.resolveURL(t.uri, s.path), i, void 0, function() {
        o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(n) {
      const s = t.byteLength || 0, i = t.byteOffset || 0;
      return n.slice(i, i + s);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, n = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const o = Ht[s.type], r = qe[s.componentType], a = s.normalized === !0, c = new r(s.count * o);
      return Promise.resolve(new nt(c, o, a));
    }
    const i = [];
    return s.bufferView !== void 0 ? i.push(this.getDependency("bufferView", s.bufferView)) : i.push(null), s.sparse !== void 0 && (i.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(i).then(function(o) {
      const r = o[0], a = Ht[s.type], c = qe[s.componentType], l = c.BYTES_PER_ELEMENT, d = l * a, u = s.byteOffset || 0, g = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, h = s.normalized === !0;
      let y, m;
      if (g && g !== d) {
        const v = Math.floor(u / g), w = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + v + ":" + s.count;
        let x = t.cache.get(w);
        x || (y = new c(r, v * g, s.count * g / l), x = new mi(y, g / l), t.cache.add(w, x)), m = new yi(x, a, u % g / l, h);
      } else
        r === null ? y = new c(s.count * a) : y = new c(r, u, s.count * a), m = new nt(y, a, h);
      if (s.sparse !== void 0) {
        const v = Ht.SCALAR, w = qe[s.sparse.indices.componentType], x = s.sparse.indices.byteOffset || 0, A = s.sparse.values.byteOffset || 0, T = new w(o[1], x, s.sparse.count * v), S = new c(o[2], A, s.sparse.count * a);
        r !== null && (m = new nt(m.array.slice(), m.itemSize, m.normalized));
        for (let N = 0, R = T.length; N < R; N++) {
          const M = T[N];
          if (m.setX(M, S[N * a]), a >= 2 && m.setY(M, S[N * a + 1]), a >= 3 && m.setZ(M, S[N * a + 2]), a >= 4 && m.setW(M, S[N * a + 3]), a >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return m;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const t = this.json, n = this.options, i = t.textures[e].source, o = t.images[i];
    let r = this.textureLoader;
    if (o.uri) {
      const a = n.manager.getHandler(o.uri);
      a !== null && (r = a);
    }
    return this.loadTextureImage(e, i, r);
  }
  loadTextureImage(e, t, n) {
    const s = this, i = this.json, o = i.textures[e], r = i.images[t], a = (r.uri || r.bufferView) + ":" + o.sampler;
    if (this.textureCache[a])
      return this.textureCache[a];
    const c = this.loadImageSource(t, n).then(function(l) {
      l.flipY = !1, l.name = o.name || r.name || "", l.name === "" && typeof r.uri == "string" && r.uri.startsWith("data:image/") === !1 && (l.name = r.uri);
      const u = (i.samplers || {})[o.sampler] || {};
      return l.magFilter = Kn[u.magFilter] || gs, l.minFilter = Kn[u.minFilter] || ws, l.wrapS = Yn[u.wrapS] || Xt, l.wrapT = Yn[u.wrapT] || Xt, s.associations.set(l, { textures: e }), l;
    }).catch(function() {
      return null;
    });
    return this.textureCache[a] = c, c;
  }
  loadImageSource(e, t) {
    const n = this, s = this.json, i = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((d) => d.clone());
    const o = s.images[e], r = self.URL || self.webkitURL;
    let a = o.uri || "", c = !1;
    if (o.bufferView !== void 0)
      a = n.getDependency("bufferView", o.bufferView).then(function(d) {
        c = !0;
        const u = new Blob([d], { type: o.mimeType });
        return a = r.createObjectURL(u), a;
      });
    else if (o.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const l = Promise.resolve(a).then(function(d) {
      return new Promise(function(u, g) {
        let h = u;
        t.isImageBitmapLoader === !0 && (h = function(y) {
          const m = new bn(y);
          m.needsUpdate = !0, u(m);
        }), t.load(tt.resolveURL(d, i.path), h, void 0, g);
      });
    }).then(function(d) {
      return c === !0 && r.revokeObjectURL(a), d.userData.mimeType = o.mimeType || Za(o.uri), d;
    }).catch(function(d) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", a), d;
    });
    return this.sourceCache[e] = l, l;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, n, s) {
    const i = this;
    return this.getDependency("texture", n.index).then(function(o) {
      if (!o)
        return null;
      if (n.texCoord !== void 0 && n.texCoord > 0 && (o = o.clone(), o.channel = n.texCoord), i.extensions[q.KHR_TEXTURE_TRANSFORM]) {
        const r = n.extensions !== void 0 ? n.extensions[q.KHR_TEXTURE_TRANSFORM] : void 0;
        if (r) {
          const a = i.associations.get(o);
          o = i.extensions[q.KHR_TEXTURE_TRANSFORM].extendTexture(o, r), i.associations.set(o, a);
        }
      }
      return s !== void 0 && (o.colorSpace = s), e[t] = o, o;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const t = e.geometry;
    let n = e.material;
    const s = t.attributes.tangent === void 0, i = t.attributes.color !== void 0, o = t.attributes.normal === void 0;
    if (e.isPoints) {
      const r = "PointsMaterial:" + n.uuid;
      let a = this.cache.get(r);
      a || (a = new gi(), It.prototype.copy.call(a, n), a.color.copy(n.color), a.map = n.map, a.sizeAttenuation = !1, this.cache.add(r, a)), n = a;
    } else if (e.isLine) {
      const r = "LineBasicMaterial:" + n.uuid;
      let a = this.cache.get(r);
      a || (a = new wi(), It.prototype.copy.call(a, n), a.color.copy(n.color), a.map = n.map, this.cache.add(r, a)), n = a;
    }
    if (s || i || o) {
      let r = "ClonedMaterial:" + n.uuid + ":";
      s && (r += "derivative-tangents:"), i && (r += "vertex-colors:"), o && (r += "flat-shading:");
      let a = this.cache.get(r);
      a || (a = n.clone(), i && (a.vertexColors = !0), o && (a.flatShading = !0), s && (a.normalScale && (a.normalScale.y *= -1), a.clearcoatNormalScale && (a.clearcoatNormalScale.y *= -1)), this.cache.add(r, a), this.associations.set(a, this.associations.get(n))), n = a;
    }
    e.material = n;
  }
  getMaterialType() {
    return ct;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, n = this.json, s = this.extensions, i = n.materials[e];
    let o;
    const r = {}, a = i.extensions || {}, c = [];
    if (a[q.KHR_MATERIALS_UNLIT]) {
      const d = s[q.KHR_MATERIALS_UNLIT];
      o = d.getMaterialType(), c.push(d.extendParams(r, i, t));
    } else {
      const d = i.pbrMetallicRoughness || {};
      if (r.color = new ve(1, 1, 1), r.opacity = 1, Array.isArray(d.baseColorFactor)) {
        const u = d.baseColorFactor;
        r.color.setRGB(u[0], u[1], u[2], de), r.opacity = u[3];
      }
      d.baseColorTexture !== void 0 && c.push(t.assignTexture(r, "map", d.baseColorTexture, Pe)), r.metalness = d.metallicFactor !== void 0 ? d.metallicFactor : 1, r.roughness = d.roughnessFactor !== void 0 ? d.roughnessFactor : 1, d.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(r, "metalnessMap", d.metallicRoughnessTexture)), c.push(t.assignTexture(r, "roughnessMap", d.metallicRoughnessTexture))), o = this._invokeOne(function(u) {
        return u.getMaterialType && u.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(u) {
        return u.extendMaterialParams && u.extendMaterialParams(e, r);
      })));
    }
    i.doubleSided === !0 && (r.side = vi);
    const l = i.alphaMode || qt.OPAQUE;
    if (l === qt.BLEND ? (r.transparent = !0, r.depthWrite = !1) : (r.transparent = !1, l === qt.MASK && (r.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : 0.5)), i.normalTexture !== void 0 && o !== _e && (c.push(t.assignTexture(r, "normalMap", i.normalTexture)), r.normalScale = new se(1, 1), i.normalTexture.scale !== void 0)) {
      const d = i.normalTexture.scale;
      r.normalScale.set(d, d);
    }
    if (i.occlusionTexture !== void 0 && o !== _e && (c.push(t.assignTexture(r, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (r.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && o !== _e) {
      const d = i.emissiveFactor;
      r.emissive = new ve().setRGB(d[0], d[1], d[2], de);
    }
    return i.emissiveTexture !== void 0 && o !== _e && c.push(t.assignTexture(r, "emissiveMap", i.emissiveTexture, Pe)), Promise.all(c).then(function() {
      const d = new o(r);
      return i.name && (d.name = i.name), Se(d, i), t.associations.set(d, { materials: e }), i.extensions && Me(s, d, i), d;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = bi.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, n = this.extensions, s = this.primitiveCache;
    function i(r) {
      return n[q.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r, t).then(function(a) {
        return $n(a, r, t);
      });
    }
    const o = [];
    for (let r = 0, a = e.length; r < a; r++) {
      const c = e[r], l = $a(c), d = s[l];
      if (d)
        o.push(d.promise);
      else {
        let u;
        c.extensions && c.extensions[q.KHR_DRACO_MESH_COMPRESSION] ? u = i(c) : u = $n(new He(), c, t), s[l] = { primitive: c, promise: u }, o.push(u);
      }
    }
    return Promise.all(o);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, n = this.json, s = this.extensions, i = n.meshes[e], o = i.primitives, r = [];
    for (let a = 0, c = o.length; a < c; a++) {
      const l = o[a].material === void 0 ? Xa(this.cache) : this.getDependency("material", o[a].material);
      r.push(l);
    }
    return r.push(t.loadGeometries(o)), Promise.all(r).then(function(a) {
      const c = a.slice(0, a.length - 1), l = a[a.length - 1], d = [];
      for (let g = 0, h = l.length; g < h; g++) {
        const y = l[g], m = o[g];
        let v;
        const w = c[g];
        if (m.mode === re.TRIANGLES || m.mode === re.TRIANGLE_STRIP || m.mode === re.TRIANGLE_FAN || m.mode === void 0)
          v = i.isSkinnedMesh === !0 ? new xi(y, w) : new ne(y, w), v.isSkinnedMesh === !0 && v.normalizeSkinWeights(), m.mode === re.TRIANGLE_STRIP ? v.geometry = Wn(v.geometry, ps) : m.mode === re.TRIANGLE_FAN && (v.geometry = Wn(v.geometry, Wt));
        else if (m.mode === re.LINES)
          v = new Ai(y, w);
        else if (m.mode === re.LINE_STRIP)
          v = new vs(y, w);
        else if (m.mode === re.LINE_LOOP)
          v = new Ei(y, w);
        else if (m.mode === re.POINTS)
          v = new Ti(y, w);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + m.mode);
        Object.keys(v.geometry.morphAttributes).length > 0 && Ya(v, i), v.name = t.createUniqueName(i.name || "mesh_" + e), Se(v, i), m.extensions && Me(s, v, m), t.assignFinalMaterial(v), d.push(v);
      }
      for (let g = 0, h = d.length; g < h; g++)
        t.associations.set(d[g], {
          meshes: e,
          primitives: g
        });
      if (d.length === 1)
        return i.extensions && Me(s, d[0], i), d[0];
      const u = new Lt();
      i.extensions && Me(s, u, i), t.associations.set(u, { meshes: e });
      for (let g = 0, h = d.length; g < h; g++)
        u.add(d[g]);
      return u;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let t;
    const n = this.json.cameras[e], s = n[n.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? t = new bs(ds.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (t = new Si(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Se(t, n), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], n = [];
    for (let s = 0, i = t.joints.length; s < i; s++)
      n.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(s) {
      const i = s.pop(), o = s, r = [], a = [];
      for (let c = 0, l = o.length; c < l; c++) {
        const d = o[c];
        if (d) {
          r.push(d);
          const u = new Ue();
          i !== null && u.fromArray(i.array, c * 16), a.push(u);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new _i(r, a);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, n = this, s = t.animations[e], i = s.name ? s.name : "animation_" + e, o = [], r = [], a = [], c = [], l = [];
    for (let d = 0, u = s.channels.length; d < u; d++) {
      const g = s.channels[d], h = s.samplers[g.sampler], y = g.target, m = y.node, v = s.parameters !== void 0 ? s.parameters[h.input] : h.input, w = s.parameters !== void 0 ? s.parameters[h.output] : h.output;
      y.node !== void 0 && (o.push(this.getDependency("node", m)), r.push(this.getDependency("accessor", v)), a.push(this.getDependency("accessor", w)), c.push(h), l.push(y));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(r),
      Promise.all(a),
      Promise.all(c),
      Promise.all(l)
    ]).then(function(d) {
      const u = d[0], g = d[1], h = d[2], y = d[3], m = d[4], v = [];
      for (let w = 0, x = u.length; w < x; w++) {
        const A = u[w], T = g[w], S = h[w], N = y[w], R = m[w];
        if (A === void 0)
          continue;
        A.updateMatrix && A.updateMatrix();
        const M = n._createAnimationTracks(A, T, S, N, R);
        if (M)
          for (let P = 0; P < M.length; P++)
            v.push(M[P]);
      }
      return new Ri(i, void 0, v);
    });
  }
  createNodeMesh(e) {
    const t = this.json, n = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : n.getDependency("mesh", s.mesh).then(function(i) {
      const o = n._getNodeRef(n.meshCache, s.mesh, i);
      return s.weights !== void 0 && o.traverse(function(r) {
        if (r.isMesh)
          for (let a = 0, c = s.weights.length; a < c; a++)
            r.morphTargetInfluences[a] = s.weights[a];
      }), o;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const t = this.json, n = this, s = t.nodes[e], i = n._loadNodeShallow(e), o = [], r = s.children || [];
    for (let c = 0, l = r.length; c < l; c++)
      o.push(n.getDependency("node", r[c]));
    const a = s.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", s.skin);
    return Promise.all([
      i,
      Promise.all(o),
      a
    ]).then(function(c) {
      const l = c[0], d = c[1], u = c[2];
      u !== null && l.traverse(function(g) {
        g.isSkinnedMesh && g.bind(u, Qa);
      });
      for (let g = 0, h = d.length; g < h; g++)
        l.add(d[g]);
      return l;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, n = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const i = t.nodes[e], o = i.name ? s.createUniqueName(i.name) : "", r = [], a = s._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return a && r.push(a), i.camera !== void 0 && r.push(s.getDependency("camera", i.camera).then(function(c) {
      return s._getNodeRef(s.cameraCache, i.camera, c);
    })), s._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      r.push(c);
    }), this.nodeCache[e] = Promise.all(r).then(function(c) {
      let l;
      if (i.isBone === !0 ? l = new Mi() : c.length > 1 ? l = new Lt() : c.length === 1 ? l = c[0] : l = new at(), l !== c[0])
        for (let d = 0, u = c.length; d < u; d++)
          l.add(c[d]);
      if (i.name && (l.userData.name = i.name, l.name = o), Se(l, i), i.extensions && Me(n, l, i), i.matrix !== void 0) {
        const d = new Ue();
        d.fromArray(i.matrix), l.applyMatrix4(d);
      } else
        i.translation !== void 0 && l.position.fromArray(i.translation), i.rotation !== void 0 && l.quaternion.fromArray(i.rotation), i.scale !== void 0 && l.scale.fromArray(i.scale);
      return s.associations.has(l) || s.associations.set(l, {}), s.associations.get(l).nodes = e, l;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, n = this.json.scenes[e], s = this, i = new Lt();
    n.name && (i.name = s.createUniqueName(n.name)), Se(i, n), n.extensions && Me(t, i, n);
    const o = n.nodes || [], r = [];
    for (let a = 0, c = o.length; a < c; a++)
      r.push(s.getDependency("node", o[a]));
    return Promise.all(r).then(function(a) {
      for (let l = 0, d = a.length; l < d; l++)
        i.add(a[l]);
      const c = (l) => {
        const d = /* @__PURE__ */ new Map();
        for (const [u, g] of s.associations)
          (u instanceof It || u instanceof bn) && d.set(u, g);
        return l.traverse((u) => {
          const g = s.associations.get(u);
          g != null && d.set(u, g);
        }), d;
      };
      return s.associations = c(i), i;
    });
  }
  _createAnimationTracks(e, t, n, s, i) {
    const o = [], r = e.name ? e.name : e.uuid, a = [];
    Te[i.path] === Te.weights ? e.traverse(function(u) {
      u.morphTargetInfluences && a.push(u.name ? u.name : u.uuid);
    }) : a.push(r);
    let c;
    switch (Te[i.path]) {
      case Te.weights:
        c = An;
        break;
      case Te.rotation:
        c = En;
        break;
      case Te.position:
      case Te.scale:
        c = xn;
        break;
      default:
        switch (n.itemSize) {
          case 1:
            c = An;
            break;
          case 2:
          case 3:
          default:
            c = xn;
            break;
        }
        break;
    }
    const l = s.interpolation !== void 0 ? Wa[s.interpolation] : xs, d = this._getArrayFromAccessor(n);
    for (let u = 0, g = a.length; u < g; u++) {
      const h = new c(
        a[u] + "." + Te[i.path],
        t.array,
        d,
        l
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(h), o.push(h);
    }
    return o;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const n = Yt(t.constructor), s = new Float32Array(t.length);
      for (let i = 0, o = t.length; i < o; i++)
        s[i] = t[i] * n;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(n) {
      const s = this instanceof En ? Va : Is;
      return new s(this.times, this.values, this.getValueSize() / 3, n);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function ec(f, e, t) {
  const n = e.attributes, s = new ki();
  if (n.POSITION !== void 0) {
    const r = t.json.accessors[n.POSITION], a = r.min, c = r.max;
    if (a !== void 0 && c !== void 0) {
      if (s.set(
        new X(a[0], a[1], a[2]),
        new X(c[0], c[1], c[2])
      ), r.normalized) {
        const l = Yt(qe[r.componentType]);
        s.min.multiplyScalar(l), s.max.multiplyScalar(l);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const i = e.targets;
  if (i !== void 0) {
    const r = new X(), a = new X();
    for (let c = 0, l = i.length; c < l; c++) {
      const d = i[c];
      if (d.POSITION !== void 0) {
        const u = t.json.accessors[d.POSITION], g = u.min, h = u.max;
        if (g !== void 0 && h !== void 0) {
          if (a.setX(Math.max(Math.abs(g[0]), Math.abs(h[0]))), a.setY(Math.max(Math.abs(g[1]), Math.abs(h[1]))), a.setZ(Math.max(Math.abs(g[2]), Math.abs(h[2]))), u.normalized) {
            const y = Yt(qe[u.componentType]);
            a.multiplyScalar(y);
          }
          r.max(a);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(r);
  }
  f.boundingBox = s;
  const o = new Bi();
  s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, f.boundingSphere = o;
}
function $n(f, e, t) {
  const n = e.attributes, s = [];
  function i(o, r) {
    return t.getDependency("accessor", o).then(function(a) {
      f.setAttribute(r, a);
    });
  }
  for (const o in n) {
    const r = Kt[o] || o.toLowerCase();
    r in f.attributes || s.push(i(n[o], r));
  }
  if (e.indices !== void 0 && !f.index) {
    const o = t.getDependency("accessor", e.indices).then(function(r) {
      f.setIndex(r);
    });
    s.push(o);
  }
  return vn.workingColorSpace !== de && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${vn.workingColorSpace}" not supported.`), Se(f, e), ec(f, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? Ka(f, e.targets, t) : f;
  });
}
const K = {
  Handedness: Object.freeze({
    NONE: "none",
    LEFT: "left",
    RIGHT: "right"
  }),
  ComponentState: Object.freeze({
    DEFAULT: "default",
    TOUCHED: "touched",
    PRESSED: "pressed"
  }),
  ComponentProperty: Object.freeze({
    BUTTON: "button",
    X_AXIS: "xAxis",
    Y_AXIS: "yAxis",
    STATE: "state"
  }),
  ComponentType: Object.freeze({
    TRIGGER: "trigger",
    SQUEEZE: "squeeze",
    TOUCHPAD: "touchpad",
    THUMBSTICK: "thumbstick",
    BUTTON: "button"
  }),
  ButtonTouchThreshold: 0.05,
  AxisTouchThreshold: 0.1,
  VisualResponseProperty: Object.freeze({
    TRANSFORM: "transform",
    VISIBILITY: "visibility"
  })
};
async function Ls(f) {
  const e = await fetch(f);
  if (e.ok)
    return e.json();
  throw new Error(e.statusText);
}
async function tc(f) {
  if (!f)
    throw new Error("No basePath supplied");
  return await Ls(`${f}/profilesList.json`);
}
async function nc(f, e, t = null, n = !0) {
  if (!f)
    throw new Error("No xrInputSource supplied");
  if (!e)
    throw new Error("No basePath supplied");
  const s = await tc(e);
  let i;
  if (f.profiles.some((a) => {
    const c = s[a];
    return c && (i = {
      profileId: a,
      profilePath: `${e}/${c.path}`,
      deprecated: !!c.deprecated
    }), !!i;
  }), !i) {
    if (!t)
      throw new Error("No matching profile name found");
    const a = s[t];
    if (!a)
      throw new Error(`No matching profile name found and default profile "${t}" missing.`);
    i = {
      profileId: t,
      profilePath: `${e}/${a.path}`,
      deprecated: !!a.deprecated
    };
  }
  const o = await Ls(i.profilePath);
  let r;
  if (n) {
    let a;
    if (f.handedness === "any" ? a = o.layouts[Object.keys(o.layouts)[0]] : a = o.layouts[f.handedness], !a)
      throw new Error(
        `No matching handedness, ${f.handedness}, in profile ${i.profileId}`
      );
    a.assetPath && (r = i.profilePath.replace("profile.json", a.assetPath));
  }
  return { profile: o, assetPath: r };
}
const sc = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: K.ComponentState.DEFAULT
};
function ic(f = 0, e = 0) {
  let t = f, n = e;
  if (Math.sqrt(f * f + e * e) > 1) {
    const o = Math.atan2(e, f);
    t = Math.cos(o), n = Math.sin(o);
  }
  return {
    normalizedXAxis: t * 0.5 + 0.5,
    normalizedYAxis: n * 0.5 + 0.5
  };
}
class oc {
  constructor(e) {
    this.componentProperty = e.componentProperty, this.states = e.states, this.valueNodeName = e.valueNodeName, this.valueNodeProperty = e.valueNodeProperty, this.valueNodeProperty === K.VisualResponseProperty.TRANSFORM && (this.minNodeName = e.minNodeName, this.maxNodeName = e.maxNodeName), this.value = 0, this.updateFromComponent(sc);
  }
  /**
   * Computes the visual response's interpolation weight based on component state
   * @param {Object} componentValues - The component from which to update
   * @param {number} xAxis - The reported X axis value of the component
   * @param {number} yAxis - The reported Y axis value of the component
   * @param {number} button - The reported value of the component's button
   * @param {string} state - The component's active state
   */
  updateFromComponent({
    xAxis: e,
    yAxis: t,
    button: n,
    state: s
  }) {
    const { normalizedXAxis: i, normalizedYAxis: o } = ic(e, t);
    switch (this.componentProperty) {
      case K.ComponentProperty.X_AXIS:
        this.value = this.states.includes(s) ? i : 0.5;
        break;
      case K.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(s) ? o : 0.5;
        break;
      case K.ComponentProperty.BUTTON:
        this.value = this.states.includes(s) ? n : 0;
        break;
      case K.ComponentProperty.STATE:
        this.valueNodeProperty === K.VisualResponseProperty.VISIBILITY ? this.value = this.states.includes(s) : this.value = this.states.includes(s) ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`);
    }
  }
}
class rc {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  constructor(e, t) {
    if (!e || !t || !t.visualResponses || !t.gamepadIndices || Object.keys(t.gamepadIndices).length === 0)
      throw new Error("Invalid arguments supplied");
    this.id = e, this.type = t.type, this.rootNodeName = t.rootNodeName, this.touchPointNodeName = t.touchPointNodeName, this.visualResponses = {}, Object.keys(t.visualResponses).forEach((n) => {
      const s = new oc(t.visualResponses[n]);
      this.visualResponses[n] = s;
    }), this.gamepadIndices = Object.assign({}, t.gamepadIndices), this.values = {
      state: K.ComponentState.DEFAULT,
      button: this.gamepadIndices.button !== void 0 ? 0 : void 0,
      xAxis: this.gamepadIndices.xAxis !== void 0 ? 0 : void 0,
      yAxis: this.gamepadIndices.yAxis !== void 0 ? 0 : void 0
    };
  }
  get data() {
    return { id: this.id, ...this.values };
  }
  /**
   * @description Poll for updated data based on current gamepad state
   * @param {Object} gamepad - The gamepad object from which the component data should be polled
   */
  updateFromGamepad(e) {
    if (this.values.state = K.ComponentState.DEFAULT, this.gamepadIndices.button !== void 0 && e.buttons.length > this.gamepadIndices.button) {
      const t = e.buttons[this.gamepadIndices.button];
      this.values.button = t.value, this.values.button = this.values.button < 0 ? 0 : this.values.button, this.values.button = this.values.button > 1 ? 1 : this.values.button, t.pressed || this.values.button === 1 ? this.values.state = K.ComponentState.PRESSED : (t.touched || this.values.button > K.ButtonTouchThreshold) && (this.values.state = K.ComponentState.TOUCHED);
    }
    this.gamepadIndices.xAxis !== void 0 && e.axes.length > this.gamepadIndices.xAxis && (this.values.xAxis = e.axes[this.gamepadIndices.xAxis], this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis, this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis, this.values.state === K.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > K.AxisTouchThreshold && (this.values.state = K.ComponentState.TOUCHED)), this.gamepadIndices.yAxis !== void 0 && e.axes.length > this.gamepadIndices.yAxis && (this.values.yAxis = e.axes[this.gamepadIndices.yAxis], this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis, this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis, this.values.state === K.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > K.AxisTouchThreshold && (this.values.state = K.ComponentState.TOUCHED)), Object.values(this.visualResponses).forEach((t) => {
      t.updateFromComponent(this.values);
    });
  }
}
class ac {
  /**
   * @param {Object} xrInputSource - The XRInputSource to build the MotionController around
   * @param {Object} profile - The best matched profile description for the supplied xrInputSource
   * @param {Object} assetUrl
   */
  constructor(e, t, n) {
    if (!e)
      throw new Error("No xrInputSource supplied");
    if (!t)
      throw new Error("No profile supplied");
    this.xrInputSource = e, this.assetUrl = n, this.id = t.profileId, this.layoutDescription = t.layouts[e.handedness], this.components = {}, Object.keys(this.layoutDescription.components).forEach((s) => {
      const i = this.layoutDescription.components[s];
      this.components[s] = new rc(s, i);
    }), this.updateFromGamepad();
  }
  get gripSpace() {
    return this.xrInputSource.gripSpace;
  }
  get targetRaySpace() {
    return this.xrInputSource.targetRaySpace;
  }
  /**
   * @description Returns a subset of component data for simplified debugging
   */
  get data() {
    const e = [];
    return Object.values(this.components).forEach((t) => {
      e.push(t.data);
    }), e;
  }
  /**
   * @description Poll for updated data based on current gamepad state
   */
  updateFromGamepad() {
    Object.values(this.components).forEach((e) => {
      e.updateFromGamepad(this.xrInputSource.gamepad);
    });
  }
}
const cc = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles", lc = "generic-trigger";
class uc extends at {
  constructor() {
    super(), this.motionController = null, this.envMap = null;
  }
  setEnvironmentMap(e) {
    return this.envMap == e ? this : (this.envMap = e, this.traverse((t) => {
      t.isMesh && (t.material.envMap = this.envMap, t.material.needsUpdate = !0);
    }), this);
  }
  /**
   * Polls data from the XRInputSource and updates the model's components to match
   * the real world data
   */
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.motionController && (this.motionController.updateFromGamepad(), Object.values(this.motionController.components).forEach((t) => {
      Object.values(t.visualResponses).forEach((n) => {
        const { valueNode: s, minNode: i, maxNode: o, value: r, valueNodeProperty: a } = n;
        s && (a === K.VisualResponseProperty.VISIBILITY ? s.visible = r : a === K.VisualResponseProperty.TRANSFORM && (s.quaternion.slerpQuaternions(
          i.quaternion,
          o.quaternion,
          r
        ), s.position.lerpVectors(
          i.position,
          o.position,
          r
        )));
      });
    }));
  }
}
function hc(f, e) {
  Object.values(f.components).forEach((t) => {
    const { type: n, touchPointNodeName: s, visualResponses: i } = t;
    if (n === K.ComponentType.TOUCHPAD)
      if (t.touchPointNode = e.getObjectByName(s), t.touchPointNode) {
        const o = new rt(1e-3), r = new _e({ color: 255 }), a = new ne(o, r);
        t.touchPointNode.add(a);
      } else
        console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);
    Object.values(i).forEach((o) => {
      const { valueNodeName: r, minNodeName: a, maxNodeName: c, valueNodeProperty: l } = o;
      if (l === K.VisualResponseProperty.TRANSFORM) {
        if (o.minNode = e.getObjectByName(a), o.maxNode = e.getObjectByName(c), !o.minNode) {
          console.warn(`Could not find ${a} in the model`);
          return;
        }
        if (!o.maxNode) {
          console.warn(`Could not find ${c} in the model`);
          return;
        }
      }
      o.valueNode = e.getObjectByName(r), o.valueNode || console.warn(`Could not find ${r} in the model`);
    });
  });
}
function Zn(f, e) {
  hc(f.motionController, e), f.envMap && e.traverse((t) => {
    t.isMesh && (t.material.envMap = f.envMap, t.material.needsUpdate = !0);
  }), f.add(e);
}
class dc {
  constructor(e = null) {
    this.gltfLoader = e, this.path = cc, this._assetCache = {}, this.gltfLoader || (this.gltfLoader = new on());
  }
  createControllerModel(e) {
    const t = new uc();
    let n = null;
    return e.addEventListener("connected", (s) => {
      const i = s.data;
      i.targetRayMode !== "tracked-pointer" || !i.gamepad || nc(i, this.path, lc).then(({ profile: o, assetPath: r }) => {
        t.motionController = new ac(
          i,
          o,
          r
        );
        const a = this._assetCache[t.motionController.assetUrl];
        if (a)
          n = a.scene.clone(), Zn(t, n);
        else {
          if (!this.gltfLoader)
            throw new Error("GLTFLoader not set.");
          this.gltfLoader.setPath(""), this.gltfLoader.load(
            t.motionController.assetUrl,
            (c) => {
              this._assetCache[t.motionController.assetUrl] = c, n = c.scene.clone(), Zn(t, n);
            },
            null,
            () => {
              throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`);
            }
          );
        }
      }).catch((o) => {
        console.warn(o);
      });
    }), e.addEventListener("disconnected", () => {
      t.motionController = null, t.remove(n), n = null;
    }), t;
  }
}
const Qn = new Ue(), Jn = new X();
class es {
  constructor(e, t, n, s, i) {
    this.controller = t, this.handModel = e, this.envMap = null;
    let o;
    !i || !i.primitive || i.primitive === "sphere" ? o = new rt(1, 10, 10) : i.primitive === "box" && (o = new Ge(1, 1, 1));
    const r = new ct();
    this.handMesh = new ys(o, r, 30), this.handMesh.frustumCulled = !1, this.handMesh.instanceMatrix.setUsage(Di), this.handMesh.castShadow = !0, this.handMesh.receiveShadow = !0, this.handModel.add(this.handMesh), this.joints = [
      "wrist",
      "thumb-metacarpal",
      "thumb-phalanx-proximal",
      "thumb-phalanx-distal",
      "thumb-tip",
      "index-finger-metacarpal",
      "index-finger-phalanx-proximal",
      "index-finger-phalanx-intermediate",
      "index-finger-phalanx-distal",
      "index-finger-tip",
      "middle-finger-metacarpal",
      "middle-finger-phalanx-proximal",
      "middle-finger-phalanx-intermediate",
      "middle-finger-phalanx-distal",
      "middle-finger-tip",
      "ring-finger-metacarpal",
      "ring-finger-phalanx-proximal",
      "ring-finger-phalanx-intermediate",
      "ring-finger-phalanx-distal",
      "ring-finger-tip",
      "pinky-finger-metacarpal",
      "pinky-finger-phalanx-proximal",
      "pinky-finger-phalanx-intermediate",
      "pinky-finger-phalanx-distal",
      "pinky-finger-tip"
    ];
  }
  updateMesh() {
    const t = this.controller.joints;
    let n = 0;
    for (let s = 0; s < this.joints.length; s++) {
      const i = t[this.joints[s]];
      i.visible && (Jn.setScalar(i.jointRadius || 8e-3), Qn.compose(i.position, i.quaternion, Jn), this.handMesh.setMatrixAt(s, Qn), n++);
    }
    this.handMesh.count = n, this.handMesh.instanceMatrix.needsUpdate = !0;
  }
}
const fc = "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";
class pc {
  constructor(e, t, n, s, i = null) {
    this.controller = t, this.handModel = e, this.bones = [], i === null && (i = new on(), i.setPath(n || fc)), i.load(`${s}.glb`, (o) => {
      const r = o.scene.children[0];
      this.handModel.add(r);
      const a = r.getObjectByProperty("type", "SkinnedMesh");
      a.frustumCulled = !1, a.castShadow = !0, a.receiveShadow = !0, [
        "wrist",
        "thumb-metacarpal",
        "thumb-phalanx-proximal",
        "thumb-phalanx-distal",
        "thumb-tip",
        "index-finger-metacarpal",
        "index-finger-phalanx-proximal",
        "index-finger-phalanx-intermediate",
        "index-finger-phalanx-distal",
        "index-finger-tip",
        "middle-finger-metacarpal",
        "middle-finger-phalanx-proximal",
        "middle-finger-phalanx-intermediate",
        "middle-finger-phalanx-distal",
        "middle-finger-tip",
        "ring-finger-metacarpal",
        "ring-finger-phalanx-proximal",
        "ring-finger-phalanx-intermediate",
        "ring-finger-phalanx-distal",
        "ring-finger-tip",
        "pinky-finger-metacarpal",
        "pinky-finger-phalanx-proximal",
        "pinky-finger-phalanx-intermediate",
        "pinky-finger-phalanx-distal",
        "pinky-finger-tip"
      ].forEach((l) => {
        const d = r.getObjectByName(l);
        d !== void 0 ? d.jointName = l : console.warn(`Couldn't find ${l} in ${s} hand mesh`), this.bones.push(d);
      });
    });
  }
  updateMesh() {
    const e = this.controller.joints;
    for (let t = 0; t < this.bones.length; t++) {
      const n = this.bones[t];
      if (n) {
        const s = e[n.jointName];
        if (s.visible) {
          const i = s.position;
          n.position.copy(i), n.quaternion.copy(s.quaternion);
        }
      }
    }
  }
}
class mc extends at {
  constructor(e) {
    super(), this.controller = e, this.motionController = null, this.envMap = null, this.mesh = null;
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.motionController && this.motionController.updateMesh();
  }
}
class yc {
  constructor() {
    this.path = null;
  }
  setPath(e) {
    return this.path = e, this;
  }
  createHandModel(e, t) {
    const n = new mc(e);
    return e.addEventListener("connected", (s) => {
      const i = s.data;
      i.hand && !n.motionController && (n.xrInputSource = i, t === void 0 || t === "spheres" ? n.motionController = new es(n, e, this.path, i.handedness, { primitive: "sphere" }) : t === "boxes" ? n.motionController = new es(n, e, this.path, i.handedness, { primitive: "box" }) : t === "mesh" && (n.motionController = new pc(n, e, this.path, i.handedness))), e.visible = !0;
    }), e.addEventListener("disconnected", () => {
      e.visible = !1;
    }), n;
  }
}
class gc extends at {
  constructor(e) {
    super();
    const t = new Ue(), n = /* @__PURE__ */ new Map(), s = e.xr;
    s.addEventListener("planesdetected", (i) => {
      const o = i.data, r = o.detectedPlanes, a = s.getReferenceSpace();
      let c = !1;
      for (const [l, d] of n)
        r.has(l) === !1 && (d.geometry.dispose(), d.material.dispose(), this.remove(d), n.delete(l), c = !0);
      for (const l of r)
        if (n.has(l) === !1) {
          const d = o.getPose(l.planeSpace, a);
          t.fromArray(d.transform.matrix);
          const u = l.polygon;
          let g = Number.MAX_SAFE_INTEGER, h = Number.MIN_SAFE_INTEGER, y = Number.MAX_SAFE_INTEGER, m = Number.MIN_SAFE_INTEGER;
          for (const S of u)
            g = Math.min(g, S.x), h = Math.max(h, S.x), y = Math.min(y, S.z), m = Math.max(m, S.z);
          const v = h - g, w = m - y, x = new Ge(v, 0.01, w), A = new _e({ color: 16777215 * Math.random() }), T = new ne(x, A);
          T.position.setFromMatrixPosition(t), T.quaternion.setFromRotationMatrix(t), this.add(T), n.set(l, T), c = !0;
        }
      c && this.dispatchEvent({ type: "planeschanged" });
    });
  }
}
class wc extends Tt {
  constructor() {
    super();
    Nt(this, "onSessionEnded", () => {
      this.xrSession.removeEventListener("end", this.onSessionEnded), this.xrSession = null, this.app.dispatchEvent({ type: "xrended", message: "xrended" });
    });
    Nt(this, "onSessionStarted", async (t) => {
      t.addEventListener("end", this.onSessionEnded), await this.app.renderer.xr.setSession(t), this.xrSession = t, this.app.dispatchEvent({ type: "xrstarted", message: "xrstarted" });
    });
    this.app = new Vs(), this.xrMode = "inline", this.xrSessionFeatures = {
      requiredFeatures: ["local"],
      optionalFeatures: ["hand-tracking"]
    }, this.xrSession = null, this.xrButton = this.createXRButton(), this.controllers = this.setupControllers(), this.xrPlanes = new gc(this.app.renderer), this.app.renderer.xr.addEventListener("planesdetected", (t) => {
      let n = this.app.renderer.xr.getSession();
      console.log(n);
    });
  }
  setXRSessionFeatures(t = "inline", n = {}) {
    this.xrMode = t, this.xrSessionFeatures = n;
  }
  checkXRSupport() {
    "xr" in navigator ? navigator.xr.isSessionSupported(this.xrMode).then((t) => {
      t ? this.app.dispatchEvent({
        type: "xrsupported",
        message: {
          isSupported: !0
        }
      }) : this.app.dispatchEvent({
        type: "xrsupported",
        message: {
          isSupported: !1,
          reason: `The session mode '${this.xrMode}' is not supported on this device`
        }
      });
    }) : this.app.dispatchEvent({
      type: "xrsupported",
      message: {
        isSupported: !1,
        reason: "The WebXR API does not exist in navigator"
      }
    });
  }
  createXRButton() {
    let t = document.createElement("button");
    return t.id = "xr-button", t.disabled = !0, t.innerText = "XR not available", this.app.addEventListener("xrsupported", (n) => {
      n.message.isSupported && (t.innerText = "Start XR", t.disabled = !1, t.addEventListener("click", () => {
        this.startXR();
      }));
    }), t;
  }
  setupControllers() {
    let t = new dc(), n = new yc(), s = [];
    for (let i = 0; i < 2; i++) {
      let o = this.app.renderer.xr.getController(i);
      s.push(o);
      let r = this.app.renderer.xr.getHand(i);
      r.add(n.createHandModel(r, "mesh")), this.app.scene.add(r);
      let a = new He().setFromPoints([
        new X(0, 0, 0),
        new X(0, 0, -1)
      ]), c = new vs(a);
      c.name = "line", c.scale.z = 3, o.add(c.clone());
      let l = this.app.renderer.xr.getControllerGrip(i);
      l.add(
        t.createControllerModel(l)
      ), this.app.scene.add(o), this.app.scene.add(l);
    }
    return s;
  }
  async startXR() {
    this.xrSession !== null && (console.log("There is already an active XR session. Exiting..."), this.xrSession.end());
    try {
      let t = await navigator.xr.requestSession(
        this.xrMode,
        this.xrSessionFeatures
      );
      this.onSessionStarted(t);
    } catch (t) {
      console.error(t);
    }
  }
}
const Ut = /* @__PURE__ */ new WeakMap();
class vc extends ms {
  constructor(e) {
    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(e) {
    return this.decoderPath = e, this;
  }
  setDecoderConfig(e) {
    return this.decoderConfig = e, this;
  }
  setWorkerLimit(e) {
    return this.workerLimit = e, this;
  }
  load(e, t, n, s) {
    const i = new At(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, (o) => {
      this.parse(o, t, s);
    }, n, s);
  }
  parse(e, t, n = () => {
  }) {
    this.decodeDracoFile(e, t, null, null, Pe).catch(n);
  }
  decodeDracoFile(e, t, n, s, i = de, o = () => {
  }) {
    const r = {
      attributeIDs: n || this.defaultAttributeIDs,
      attributeTypes: s || this.defaultAttributeTypes,
      useUniqueIDs: !!n,
      vertexColorSpace: i
    };
    return this.decodeGeometry(e, r).then(t).catch(o);
  }
  decodeGeometry(e, t) {
    const n = JSON.stringify(t);
    if (Ut.has(e)) {
      const a = Ut.get(e);
      if (a.key === n)
        return a.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let s;
    const i = this.workerNextTaskID++, o = e.byteLength, r = this._getWorker(i, o).then((a) => (s = a, new Promise((c, l) => {
      s._callbacks[i] = { resolve: c, reject: l }, s.postMessage({ type: "decode", id: i, taskConfig: t, buffer: e }, [e]);
    }))).then((a) => this._createGeometry(a.geometry));
    return r.catch(() => !0).then(() => {
      s && i && this._releaseTask(s, i);
    }), Ut.set(e, {
      key: n,
      promise: r
    }), r;
  }
  _createGeometry(e) {
    const t = new He();
    e.index && t.setIndex(new nt(e.index.array, 1));
    for (let n = 0; n < e.attributes.length; n++) {
      const s = e.attributes[n], i = s.name, o = s.array, r = s.itemSize, a = new nt(o, r);
      i === "color" && (this._assignVertexColorSpace(a, s.vertexColorSpace), a.normalized = !(o instanceof Float32Array)), t.setAttribute(i, a);
    }
    return t;
  }
  _assignVertexColorSpace(e, t) {
    if (t !== Pe)
      return;
    const n = new ve();
    for (let s = 0, i = e.count; s < i; s++)
      n.fromBufferAttribute(e, s).convertSRGBToLinear(), e.setXYZ(s, n.r, n.g, n.b);
  }
  _loadLibrary(e, t) {
    const n = new At(this.manager);
    return n.setPath(this.decoderPath), n.setResponseType(t), n.setWithCredentials(this.withCredentials), new Promise((s, i) => {
      n.load(e, s, void 0, i);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((n) => {
      const s = n[0];
      e || (this.decoderConfig.wasmBinary = n[1]);
      const i = bc.toString(), o = [
        "/* draco decoder */",
        s,
        "",
        "/* worker */",
        i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([o]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const s = new Worker(this.workerSourceURL);
        s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({ type: "init", decoderConfig: this.decoderConfig }), s.onmessage = function(i) {
          const o = i.data;
          switch (o.type) {
            case "decode":
              s._callbacks[o.id].resolve(o);
              break;
            case "error":
              s._callbacks[o.id].reject(o);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + o.type + '"');
          }
        }, this.workerPool.push(s);
      } else
        this.workerPool.sort(function(s, i) {
          return s._taskLoad > i._taskLoad ? -1 : 1;
        });
      const n = this.workerPool[this.workerPool.length - 1];
      return n._taskCosts[e] = t, n._taskLoad += t, n;
    });
  }
  _releaseTask(e, t) {
    e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((e) => e._taskLoad));
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function bc() {
  let f, e;
  onmessage = function(o) {
    const r = o.data;
    switch (r.type) {
      case "init":
        f = r.decoderConfig, e = new Promise(function(l) {
          f.onModuleLoaded = function(d) {
            l({ draco: d });
          }, DracoDecoderModule(f);
        });
        break;
      case "decode":
        const a = r.buffer, c = r.taskConfig;
        e.then((l) => {
          const d = l.draco, u = new d.Decoder();
          try {
            const g = t(d, u, new Int8Array(a), c), h = g.attributes.map((y) => y.array.buffer);
            g.index && h.push(g.index.array.buffer), self.postMessage({ type: "decode", id: r.id, geometry: g }, h);
          } catch (g) {
            console.error(g), self.postMessage({ type: "error", id: r.id, error: g.message });
          } finally {
            d.destroy(u);
          }
        });
        break;
    }
  };
  function t(o, r, a, c) {
    const l = c.attributeIDs, d = c.attributeTypes;
    let u, g;
    const h = r.GetEncodedGeometryType(a);
    if (h === o.TRIANGULAR_MESH)
      u = new o.Mesh(), g = r.DecodeArrayToMesh(a, a.byteLength, u);
    else if (h === o.POINT_CLOUD)
      u = new o.PointCloud(), g = r.DecodeArrayToPointCloud(a, a.byteLength, u);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!g.ok() || u.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + g.error_msg());
    const y = { index: null, attributes: [] };
    for (const m in l) {
      const v = self[d[m]];
      let w, x;
      if (c.useUniqueIDs)
        x = l[m], w = r.GetAttributeByUniqueId(u, x);
      else {
        if (x = r.GetAttributeId(u, o[l[m]]), x === -1)
          continue;
        w = r.GetAttribute(u, x);
      }
      const A = s(o, r, u, m, v, w);
      m === "color" && (A.vertexColorSpace = c.vertexColorSpace), y.attributes.push(A);
    }
    return h === o.TRIANGULAR_MESH && (y.index = n(o, r, u)), o.destroy(u), y;
  }
  function n(o, r, a) {
    const l = a.num_faces() * 3, d = l * 4, u = o._malloc(d);
    r.GetTrianglesUInt32Array(a, d, u);
    const g = new Uint32Array(o.HEAPF32.buffer, u, l).slice();
    return o._free(u), { array: g, itemSize: 1 };
  }
  function s(o, r, a, c, l, d) {
    const u = d.num_components(), h = a.num_points() * u, y = h * l.BYTES_PER_ELEMENT, m = i(o, l), v = o._malloc(y);
    r.GetAttributeDataArrayForAllPoints(a, d, m, y, v);
    const w = new l(o.HEAPF32.buffer, v, h).slice();
    return o._free(v), {
      name: c,
      array: w,
      itemSize: u
    };
  }
  function i(o, r) {
    switch (r) {
      case Float32Array:
        return o.DT_FLOAT32;
      case Int8Array:
        return o.DT_INT8;
      case Int16Array:
        return o.DT_INT16;
      case Int32Array:
        return o.DT_INT32;
      case Uint8Array:
        return o.DT_UINT8;
      case Uint16Array:
        return o.DT_UINT16;
      case Uint32Array:
        return o.DT_UINT32;
    }
  }
}
class xc {
  constructor() {
    this.gltfLoader = new on(), this.dracoLoader = new vc(), this.dracoLoader.setDecoderPath("../libs/draco/gltf/"), this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }
  async load(e) {
    return await this.gltfLoader.loadAsync(e);
  }
}
class Ac extends Tt {
  constructor() {
    super(), this.app = new Vs();
  }
  register(e, t) {
    document.addEventListener("keydown", (n) => {
    });
  }
}
var $t = { exports: {} }, wt = {}, ts;
function Ec() {
  if (ts)
    return wt;
  ts = 1, Object.defineProperty(wt, "__esModule", { value: !0 });
  function f(h, y) {
    (y == null || y > h.length) && (y = h.length);
    for (var m = 0, v = new Array(y); m < y; m++)
      v[m] = h[m];
    return v;
  }
  function e(h) {
    if (Array.isArray(h))
      return f(h);
  }
  function t(h) {
    if (typeof Symbol < "u" && h[Symbol.iterator] != null || h["@@iterator"] != null)
      return Array.from(h);
  }
  function n(h, y) {
    if (h) {
      if (typeof h == "string")
        return f(h, y);
      var m = Object.prototype.toString.call(h).slice(8, -1);
      if (m === "Object" && h.constructor && (m = h.constructor.name), m === "Map" || m === "Set")
        return Array.from(h);
      if (m === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(m))
        return f(h, y);
    }
  }
  function s() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function i(h) {
    return e(h) || t(h) || n(h) || s();
  }
  function o(h, y) {
    var m = typeof Symbol < "u" && h[Symbol.iterator] || h["@@iterator"];
    if (!m) {
      if (Array.isArray(h) || (m = n(h)) || y && h && typeof h.length == "number") {
        m && (h = m);
        var v = 0, w = function() {
        };
        return {
          s: w,
          n: function() {
            return v >= h.length ? {
              done: !0
            } : {
              done: !1,
              value: h[v++]
            };
          },
          e: function(S) {
            throw S;
          },
          f: w
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var x = !0, A = !1, T;
    return {
      s: function() {
        m = m.call(h);
      },
      n: function() {
        var S = m.next();
        return x = S.done, S;
      },
      e: function(S) {
        A = !0, T = S;
      },
      f: function() {
        try {
          !x && m.return != null && m.return();
        } finally {
          if (A)
            throw T;
        }
      }
    };
  }
  function r(h, y) {
    if (!(h instanceof y))
      throw new TypeError("Cannot call a class as a function");
  }
  function a(h, y) {
    if (typeof h != "object" || h === null)
      return h;
    var m = h[Symbol.toPrimitive];
    if (m !== void 0) {
      var v = m.call(h, y || "default");
      if (typeof v != "object")
        return v;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (y === "string" ? String : Number)(h);
  }
  function c(h) {
    var y = a(h, "string");
    return typeof y == "symbol" ? y : String(y);
  }
  function l(h, y) {
    for (var m = 0; m < y.length; m++) {
      var v = y[m];
      v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(h, c(v.key), v);
    }
  }
  function d(h, y, m) {
    return y && l(h.prototype, y), m && l(h, m), Object.defineProperty(h, "prototype", {
      writable: !1
    }), h;
  }
  function u(h, y, m) {
    return y = c(y), y in h ? Object.defineProperty(h, y, {
      value: m,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : h[y] = m, h;
  }
  var g = /* @__PURE__ */ function() {
    function h() {
      r(this, h), u(this, "subscribers", /* @__PURE__ */ new Set());
    }
    return d(h, [{
      key: "onSubscribe",
      get: (
        /**
         * Event that is emitted when a new subscription is added.
         */
        function() {
          return this._onSubscribe || (this._onSubscribe = new h()), this._onSubscribe;
        }
      )
      /**
       * Event that is emitted when a subscription is removed.
       */
    }, {
      key: "onUnsubscribe",
      get: function() {
        return this._onUnsubscribe || (this._onUnsubscribe = new h()), this._onUnsubscribe;
      }
      /**
       * Subscribes a callback to the event.
       *
       * @param callback The callback to subscribe to the event.
       */
    }, {
      key: "subscribe",
      value: function(m) {
        var v, w = this;
        return this.subscribers.add(m), (v = this._onSubscribe) === null || v === void 0 || v.emit(m), function() {
          return w.unsubscribe(m);
        };
      }
      /**
       * Unsubscribes a callback from the event.
       *
       * @param callback The callback to unsubscribe from the event.
       */
    }, {
      key: "unsubscribe",
      value: function(m) {
        var v;
        this.subscribers.delete(m), (v = this._onUnsubscribe) === null || v === void 0 || v.emit(m);
      }
      /**
       * Clears all existing subscriptions.
       */
    }, {
      key: "clear",
      value: function() {
        if (this._onUnsubscribe) {
          var m = o(this.subscribers), v;
          try {
            for (m.s(); !(v = m.n()).done; ) {
              var w = v.value;
              this._onUnsubscribe.emit(w);
            }
          } catch (x) {
            m.e(x);
          } finally {
            m.f();
          }
        }
        this.subscribers.clear();
      }
      /**
       * Emit the event. This will invoke all stored listeners, passing the
       * given payload to each of them.
       *
       * @param args Arguments to pass to the listeners.
       */
    }, {
      key: "emit",
      value: function() {
        for (var m = arguments.length, v = new Array(m), w = 0; w < m; w++)
          v[w] = arguments[w];
        this.subscribers.forEach(function(x) {
          return x.apply(void 0, v);
        });
      }
      /**
       * Emit the event. This will invoke all stored listeners, passing the
       * given payload to each of them. This method supports asynchronous
       * listeners and returns a promise that resolves when all listeners
       * have completed their work.
       *
       * @param args Arguments to pass to the listeners.
       * @returns A promise that resolves when all listeners have been invoked.
       */
    }, {
      key: "emitAsync",
      value: function() {
        for (var m = arguments.length, v = new Array(m), w = 0; w < m; w++)
          v[w] = arguments[w];
        return Promise.all(i(this.subscribers).map(function(x) {
          return x.apply(void 0, v);
        }));
      }
    }]), h;
  }();
  return wt.Event = g, wt;
}
var vt = {}, ns;
function Tc() {
  if (ns)
    return vt;
  ns = 1, Object.defineProperty(vt, "__esModule", { value: !0 });
  function f(h, y) {
    (y == null || y > h.length) && (y = h.length);
    for (var m = 0, v = new Array(y); m < y; m++)
      v[m] = h[m];
    return v;
  }
  function e(h) {
    if (Array.isArray(h))
      return f(h);
  }
  function t(h) {
    if (typeof Symbol < "u" && h[Symbol.iterator] != null || h["@@iterator"] != null)
      return Array.from(h);
  }
  function n(h, y) {
    if (h) {
      if (typeof h == "string")
        return f(h, y);
      var m = Object.prototype.toString.call(h).slice(8, -1);
      if (m === "Object" && h.constructor && (m = h.constructor.name), m === "Map" || m === "Set")
        return Array.from(h);
      if (m === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(m))
        return f(h, y);
    }
  }
  function s() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function i(h) {
    return e(h) || t(h) || n(h) || s();
  }
  function o(h, y) {
    var m = typeof Symbol < "u" && h[Symbol.iterator] || h["@@iterator"];
    if (!m) {
      if (Array.isArray(h) || (m = n(h)) || y && h && typeof h.length == "number") {
        m && (h = m);
        var v = 0, w = function() {
        };
        return {
          s: w,
          n: function() {
            return v >= h.length ? {
              done: !0
            } : {
              done: !1,
              value: h[v++]
            };
          },
          e: function(S) {
            throw S;
          },
          f: w
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var x = !0, A = !1, T;
    return {
      s: function() {
        m = m.call(h);
      },
      n: function() {
        var S = m.next();
        return x = S.done, S;
      },
      e: function(S) {
        A = !0, T = S;
      },
      f: function() {
        try {
          !x && m.return != null && m.return();
        } finally {
          if (A)
            throw T;
        }
      }
    };
  }
  function r(h, y) {
    if (!(h instanceof y))
      throw new TypeError("Cannot call a class as a function");
  }
  function a(h, y) {
    if (typeof h != "object" || h === null)
      return h;
    var m = h[Symbol.toPrimitive];
    if (m !== void 0) {
      var v = m.call(h, y || "default");
      if (typeof v != "object")
        return v;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (y === "string" ? String : Number)(h);
  }
  function c(h) {
    var y = a(h, "string");
    return typeof y == "symbol" ? y : String(y);
  }
  function l(h, y) {
    for (var m = 0; m < y.length; m++) {
      var v = y[m];
      v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(h, c(v.key), v);
    }
  }
  function d(h, y, m) {
    return y && l(h.prototype, y), m && l(h, m), Object.defineProperty(h, "prototype", {
      writable: !1
    }), h;
  }
  function u(h, y, m) {
    return y = c(y), y in h ? Object.defineProperty(h, y, {
      value: m,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : h[y] = m, h;
  }
  var g = /* @__PURE__ */ function() {
    function h() {
      r(this, h), u(this, "subscribers", /* @__PURE__ */ new Set());
    }
    return d(h, [{
      key: "onSubscribe",
      get: (
        /**
         * Event that is emitted when a new subscription is added.
         */
        function() {
          return this._onSubscribe || (this._onSubscribe = new h()), this._onSubscribe;
        }
      )
      /**
       * Event that is emitted when a subscription is removed.
       */
    }, {
      key: "onUnsubscribe",
      get: function() {
        return this._onUnsubscribe || (this._onUnsubscribe = new h()), this._onUnsubscribe;
      }
      /**
       * Subscribes a callback to the event.
       *
       * @param callback The callback to subscribe to the event.
       */
    }, {
      key: "subscribe",
      value: function(m) {
        var v, w = this;
        return this.subscribers.add(m), (v = this._onSubscribe) === null || v === void 0 || v.emit(m), function() {
          return w.unsubscribe(m);
        };
      }
      /**
       * Unsubscribes a callback from the event.
       *
       * @param callback The callback to unsubscribe from the event.
       */
    }, {
      key: "unsubscribe",
      value: function(m) {
        var v;
        this.subscribers.delete(m), (v = this._onUnsubscribe) === null || v === void 0 || v.emit(m);
      }
      /**
       * Clears all existing subscriptions.
       */
    }, {
      key: "clear",
      value: function() {
        if (this._onUnsubscribe) {
          var m = o(this.subscribers), v;
          try {
            for (m.s(); !(v = m.n()).done; ) {
              var w = v.value;
              this._onUnsubscribe.emit(w);
            }
          } catch (x) {
            m.e(x);
          } finally {
            m.f();
          }
        }
        this.subscribers.clear();
      }
      /**
       * Emit the event. This will invoke all stored listeners, passing the
       * given payload to each of them.
       *
       * @param args Arguments to pass to the listeners.
       */
    }, {
      key: "emit",
      value: function() {
        for (var m = arguments.length, v = new Array(m), w = 0; w < m; w++)
          v[w] = arguments[w];
        this.subscribers.forEach(function(x) {
          return x.apply(void 0, v);
        });
      }
      /**
       * Emit the event. This will invoke all stored listeners, passing the
       * given payload to each of them. This method supports asynchronous
       * listeners and returns a promise that resolves when all listeners
       * have completed their work.
       *
       * @param args Arguments to pass to the listeners.
       * @returns A promise that resolves when all listeners have been invoked.
       */
    }, {
      key: "emitAsync",
      value: function() {
        for (var m = arguments.length, v = new Array(m), w = 0; w < m; w++)
          v[w] = arguments[w];
        return Promise.all(i(this.subscribers).map(function(x) {
          return x.apply(void 0, v);
        }));
      }
    }]), h;
  }();
  return vt.Event = g, vt;
}
process.env.NODE_ENV === "production" ? $t.exports = Tc() : $t.exports = Ec();
var ss = $t.exports;
function is(f, e) {
  (e == null || e > f.length) && (e = f.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = f[t];
  return n;
}
function Sc(f, e) {
  if (f) {
    if (typeof f == "string")
      return is(f, e);
    var t = Object.prototype.toString.call(f).slice(8, -1);
    if (t === "Object" && f.constructor && (t = f.constructor.name), t === "Map" || t === "Set")
      return Array.from(f);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return is(f, e);
  }
}
function _c(f, e) {
  var t = typeof Symbol < "u" && f[Symbol.iterator] || f["@@iterator"];
  if (!t) {
    if (Array.isArray(f) || (t = Sc(f)) || e && f && typeof f.length == "number") {
      t && (f = t);
      var n = 0, s = function() {
      };
      return {
        s,
        n: function() {
          return n >= f.length ? {
            done: !0
          } : {
            done: !1,
            value: f[n++]
          };
        },
        e: function(a) {
          throw a;
        },
        f: s
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i = !0, o = !1, r;
  return {
    s: function() {
      t = t.call(f);
    },
    n: function() {
      var a = t.next();
      return i = a.done, a;
    },
    e: function(a) {
      o = !0, r = a;
    },
    f: function() {
      try {
        !i && t.return != null && t.return();
      } finally {
        if (o)
          throw r;
      }
    }
  };
}
function Rc(f, e) {
  if (!(f instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Mc(f, e) {
  if (typeof f != "object" || f === null)
    return f;
  var t = f[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(f, e || "default");
    if (typeof n != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(f);
}
function Os(f) {
  var e = Mc(f, "string");
  return typeof e == "symbol" ? e : String(e);
}
function os(f, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(f, Os(n.key), n);
  }
}
function Cc(f, e, t) {
  return e && os(f.prototype, e), t && os(f, t), Object.defineProperty(f, "prototype", {
    writable: !1
  }), f;
}
function bt(f, e, t) {
  return e = Os(e), e in f ? Object.defineProperty(f, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : f[e] = t, f;
}
var Fs;
Fs = Symbol.iterator;
var zs = /* @__PURE__ */ function() {
  function f() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    Rc(this, f), bt(this, "_version", 0), bt(this, "onEntityAdded", new ss.Event()), bt(this, "onEntityRemoved", new ss.Event()), bt(this, "entityPositions", /* @__PURE__ */ new Map()), this._entities = e, this.add = this.add.bind(this), this.remove = this.remove.bind(this);
    for (var t = 0; t < e.length; t++)
      this.entityPositions.set(e[t], t);
  }
  return Cc(f, [{
    key: "version",
    get: (
      /**
       * The current version of the bucket. Increases every time an entity is
       * added or removed.
       */
      function() {
        return this._version;
      }
    )
    /**
     * An array of all entities within the bucket. Please note that for iterating
     * over the entities in this bucket, it is recommended that you use the
     * `for (const entity of bucket)` iterator form.
     */
  }, {
    key: "entities",
    get: function() {
      return this._entities;
    }
    /* Custom iterator that iterates over all entities in reverse order. */
  }, {
    key: Fs,
    value: function() {
      var t = this, n = this._entities.length, s = {
        value: void 0,
        done: !1
      };
      return {
        next: function() {
          return s.value = t._entities[--n], s.done = n < 0, s;
        }
      };
    }
  }, {
    key: "size",
    get: (
      /**
       * Returns the total size of the bucket, i.e. the number of entities it contains.
       */
      function() {
        return this.entities.length;
      }
    )
    /**
     * Returns the first entity in the bucket, or `undefined` if the bucket is empty.
     */
  }, {
    key: "first",
    get: function() {
      return this.entities[0];
    }
    /**
     * Returns true if the bucket contains the given entity.
     *
     * @param entity The entity to check for.
     * @returns `true` if the specificed entity is in this bucket, `false` otherwise.
     */
  }, {
    key: "has",
    value: function(t) {
      return this.entityPositions.has(t);
    }
    /**
     * Adds the given entity to the bucket. If the entity is already in the bucket, it is
     * not added again.
     *
     * @param entity The entity to add to the bucket.
     * @returns The entity passed into this function (regardless of whether it was added or not).
     */
  }, {
    key: "add",
    value: function(t) {
      return t && !this.has(t) && (this.entities.push(t), this.entityPositions.set(t, this.entities.length - 1), this._version++, this.onEntityAdded.emit(t)), t;
    }
    /**
     * Removes the given entity from the bucket. If the entity is not in the bucket, nothing
     * happens.
     *
     * @param entity The entity to remove from the bucket.
     * @returns The entity passed into this function (regardless of whether it was removed or not).
     */
  }, {
    key: "remove",
    value: function(t) {
      if (this.has(t)) {
        this.onEntityRemoved.emit(t);
        var n = this.entityPositions.get(t);
        this.entityPositions.delete(t);
        var s = this.entities[this.entities.length - 1];
        s !== t && (this.entities[n] = s, this.entityPositions.set(s, n)), this.entities.pop(), this._version++;
      }
      return t;
    }
    /**
     * Removes all entities from the bucket. Will cause the `onEntityRemoved` event to be
     * fired for each entity.
     */
  }, {
    key: "clear",
    value: function() {
      var t = _c(this), n;
      try {
        for (t.s(); !(n = t.n()).done; ) {
          var s = n.value;
          this.remove(s);
        }
      } catch (i) {
        t.e(i);
      } finally {
        t.f();
      }
    }
  }]), f;
}(), rs = /* @__PURE__ */ new WeakMap(), as = 0, Nc = function(e) {
  var t = rs.get(e);
  return t !== void 0 ? t : (rs.set(e, as), as++);
};
function Pc() {
  var f = new Array();
  function e(s) {
    f.push(s);
  }
  function t() {
    f.length = 0;
  }
  function n() {
    f.forEach(function(s) {
      return s();
    }), t();
  }
  return e.clear = t, e.flush = n, e;
}
function Zt(f, e) {
  (e == null || e > f.length) && (e = f.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = f[t];
  return n;
}
function Ic(f) {
  if (Array.isArray(f))
    return Zt(f);
}
function Lc(f) {
  if (typeof Symbol < "u" && f[Symbol.iterator] != null || f["@@iterator"] != null)
    return Array.from(f);
}
function ks(f, e) {
  if (f) {
    if (typeof f == "string")
      return Zt(f, e);
    var t = Object.prototype.toString.call(f).slice(8, -1);
    if (t === "Object" && f.constructor && (t = f.constructor.name), t === "Map" || t === "Set")
      return Array.from(f);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return Zt(f, e);
  }
}
function Oc() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function it(f) {
  return Ic(f) || Lc(f) || ks(f) || Oc();
}
function Ie(f) {
  return Ie = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Ie(f);
}
function Fc(f, e) {
  for (; !Object.prototype.hasOwnProperty.call(f, e) && (f = Ie(f), f !== null); )
    ;
  return f;
}
function ot() {
  return typeof Reflect < "u" && Reflect.get ? ot = Reflect.get.bind() : ot = function(e, t, n) {
    var s = Fc(e, t);
    if (s) {
      var i = Object.getOwnPropertyDescriptor(s, t);
      return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value;
    }
  }, ot.apply(this, arguments);
}
function Qt(f, e) {
  var t = typeof Symbol < "u" && f[Symbol.iterator] || f["@@iterator"];
  if (!t) {
    if (Array.isArray(f) || (t = ks(f)) || e && f && typeof f.length == "number") {
      t && (f = t);
      var n = 0, s = function() {
      };
      return {
        s,
        n: function() {
          return n >= f.length ? {
            done: !0
          } : {
            done: !1,
            value: f[n++]
          };
        },
        e: function(a) {
          throw a;
        },
        f: s
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i = !0, o = !1, r;
  return {
    s: function() {
      t = t.call(f);
    },
    n: function() {
      var a = t.next();
      return i = a.done, a;
    },
    e: function(a) {
      o = !0, r = a;
    },
    f: function() {
      try {
        !i && t.return != null && t.return();
      } finally {
        if (o)
          throw r;
      }
    }
  };
}
function zc(f, e) {
  if (typeof f != "object" || f === null)
    return f;
  var t = f[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(f, e || "default");
    if (typeof n != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(f);
}
function Bs(f) {
  var e = zc(f, "string");
  return typeof e == "symbol" ? e : String(e);
}
function je(f, e, t) {
  return e = Bs(e), e in f ? Object.defineProperty(f, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : f[e] = t, f;
}
function cs(f, e) {
  var t = Object.keys(f);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(f);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(f, s).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Ce(f) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? cs(Object(t), !0).forEach(function(n) {
      je(f, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(f, Object.getOwnPropertyDescriptors(t)) : cs(Object(t)).forEach(function(n) {
      Object.defineProperty(f, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return f;
}
function js(f, e) {
  if (!(f instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function ls(f, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(f, Bs(n.key), n);
  }
}
function Ds(f, e, t) {
  return e && ls(f.prototype, e), t && ls(f, t), Object.defineProperty(f, "prototype", {
    writable: !1
  }), f;
}
function De(f) {
  if (f === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return f;
}
function Jt(f, e) {
  return Jt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, s) {
    return n.__proto__ = s, n;
  }, Jt(f, e);
}
function Hs(f, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  f.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: f,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(f, "prototype", {
    writable: !1
  }), e && Jt(f, e);
}
function kc() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Bc(f, e) {
  if (e && (typeof e == "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return De(f);
}
function qs(f) {
  var e = kc();
  return function() {
    var n = Ie(f), s;
    if (e) {
      var i = Ie(this).constructor;
      s = Reflect.construct(n, arguments, i);
    } else
      s = n.apply(this, arguments);
    return Bc(this, s);
  };
}
var Gs, jc = /* @__PURE__ */ function(f) {
  Hs(t, f);
  var e = qs(t);
  function t() {
    var n, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return js(this, t), n = e.call(this, s), je(De(n), "queries", /* @__PURE__ */ new Set()), je(De(n), "entityToId", /* @__PURE__ */ new Map()), je(De(n), "idToEntity", /* @__PURE__ */ new Map()), je(De(n), "nextId", 0), n.onEntityAdded.subscribe(function(i) {
      n.reindex(i);
    }), n.onEntityRemoved.subscribe(function(i) {
      if (n.queries.forEach(function(r) {
        return r.remove(i);
      }), n.entityToId.has(i)) {
        var o = n.entityToId.get(i);
        n.idToEntity.delete(o), n.entityToId.delete(i);
      }
    }), n;
  }
  return Ds(t, [{
    key: "update",
    value: function(n) {
      function s(i, o, r) {
        return n.apply(this, arguments);
      }
      return s.toString = function() {
        return n.toString();
      }, s;
    }(
      function(n, s, i) {
        if (typeof s == "function") {
          var o = s(n);
          o && Object.assign(n, o);
        } else
          typeof s == "string" ? n[s] = i : s && Object.assign(n, s);
        return this.reindex(n), n;
      }
      /**
       * Adds a component to an entity. If the entity already has the component, the
       * existing component will not be overwritten.
       *
       * After the component was added, the entity will be reindexed, causing it to be
       * added to or removed from any queries depending on their criteria.
       *
       * @param entity The entity to modify.
       * @param component The name of the component to add.
       * @param value The value of the component to add.
       */
    )
  }, {
    key: "addComponent",
    value: function(s, i, o) {
      s[i] === void 0 && (s[i] = o, this.reindex(s));
    }
    /**
     * Removes a component from an entity. If the entity does not have the component,
     * this function does nothing.
     *
     * After the component was removed, the entity will be reindexed, causing it to be
     * added to or removed from any queries depending on their criteria.
     *
     * @param entity The entity to modify.
     * @param component The name of the component to remove.
     */
  }, {
    key: "removeComponent",
    value: function(s, i) {
      if (s[i] !== void 0) {
        if (this.has(s)) {
          var o = Ce({}, s);
          delete o[i], this.reindex(s, o);
        }
        delete s[i];
      }
    }
  }, {
    key: "query",
    value: (
      /**
       * Creates (or reuses) a query that matches the given configuration.
       *
       * @param config The query configuration.
       * @returns A query that matches the given configuration.
       */
      function(s) {
        var i = qc(s), o = Us(i), r = Qt(this.queries), a;
        try {
          for (r.s(); !(a = r.n()).done; ) {
            var c = a.value;
            if (c.key === o)
              return c;
          }
        } catch (d) {
          r.e(d);
        } finally {
          r.f();
        }
        var l = new Dc(this, i);
        return this.queries.add(l), l;
      }
    )
    /**
     * Creates (or reuses) a query that holds entities that have all of the specified
     * components.
     *
     * @param components One or more component names to query for.
     * @returns A query that holds entities that have all of the given components.
     */
  }, {
    key: "with",
    value: function() {
      for (var s = arguments.length, i = new Array(s), o = 0; o < s; o++)
        i[o] = arguments[o];
      return this.query({
        with: i,
        without: [],
        predicates: []
      });
    }
    /**
     * Creates (or reuses) a query that holds entities that do not have any of the
     * specified components.
     *
     * @param components One or more component names to query for.
     * @returns A query that holds entities that do not have any of the given components.
     */
  }, {
    key: "without",
    value: function() {
      for (var s = arguments.length, i = new Array(s), o = 0; o < s; o++)
        i[o] = arguments[o];
      return this.query({
        with: [],
        without: i,
        predicates: []
      });
    }
    /**
     * Creates (or reuses) a query that holds entities that match the given predicate.
     * Please note that as soon as you are building queries that use predicates, you
     * will need to explicitly reindex entities when their properties change.
     *
     * @param predicate The predicate that entities must match.
     * @returns A query that holds entities that match the given predicate.
     */
  }, {
    key: "where",
    value: function(s) {
      return this.query({
        with: [],
        without: [],
        predicates: [s]
      });
    }
    /**
     * Reindexes the specified entity. This will iteratere over all registered queries
     * and ask them to reevaluate the entity.
     *
     * If the `future` parameter is specified,
     * it will be used in the evaluation instead of the entity itself. This is useful
     * if you are about to perform a destructive change on the entity (like removing
     * a component), but want emitted events to still have access to the unmodified entity
     * before the change.
     *
     * @param entity The entity to reindex.
     * @param future The entity that the entity will become in the future.
     */
  }, {
    key: "reindex",
    value: function(s) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : s;
      if (this.has(s)) {
        var o = Qt(this.queries), r;
        try {
          for (o.s(); !(r = o.n()).done; ) {
            var a = r.value;
            a.evaluate(s, i);
          }
        } catch (c) {
          o.e(c);
        } finally {
          o.f();
        }
      }
    }
  }, {
    key: "id",
    value: (
      /**
       * Generate and return a numerical identifier for the given entity. The ID can later
       * be used to retrieve the entity again through the `entity(id)` method.
       *
       * @param entity The entity to get the ID for.
       * @returns An ID for the entity, or undefined if the entity is not in the world.
       */
      function(s) {
        if (this.has(s)) {
          if (!this.entityToId.has(s)) {
            var i = this.nextId++;
            this.entityToId.set(s, i), this.idToEntity.set(i, s);
          }
          return this.entityToId.get(s);
        }
      }
    )
    /**
     * Given an entity ID that was previously generated through the `id(entity)` function,
     * returns the entity matching that ID, or undefined if no such entity exists.
     *
     * @param id The ID of the entity to retrieve.
     * @returns The entity with the given ID, or undefined if no such entity exists.
     */
  }, {
    key: "entity",
    value: function(s) {
      return this.idToEntity.get(s);
    }
  }]), t;
}(zs);
Gs = Symbol.iterator;
var Dc = /* @__PURE__ */ function(f) {
  Hs(t, f);
  var e = qs(t);
  function t(n, s) {
    var i;
    return js(this, t), i = e.call(this), je(De(i), "_isConnected", !1), i.world = n, i.config = s, i.key = Us(s), i.onEntityAdded.onSubscribe.subscribe(function() {
      return i.connect();
    }), i.onEntityRemoved.onSubscribe.subscribe(function() {
      return i.connect();
    }), i;
  }
  return Ds(t, [{
    key: "isConnected",
    get: (
      /**
       * True if this query is connected to the world, and will automatically
       * re-evaluate when entities are added or removed.
       */
      function() {
        return this._isConnected;
      }
    )
    /**
     * A unique, string-based key for this query, based on its configuration.
     */
  }, {
    key: "entities",
    get: function() {
      return this._isConnected || this.connect(), ot(Ie(t.prototype), "entities", this);
    }
  }, {
    key: Gs,
    value: function() {
      return this._isConnected || this.connect(), ot(Ie(t.prototype), Symbol.iterator, this).call(this);
    }
    /**
     * Connects this query to the world. While connected, it will automatically
     * re-evaluate when entities are added or removed, and store those that match
     * its query configuration.
     *
     * @returns The query object.
     */
  }, {
    key: "connect",
    value: function() {
      if (!this._isConnected) {
        this._isConnected = !0;
        var s = Qt(this.world), i;
        try {
          for (s.s(); !(i = s.n()).done; ) {
            var o = i.value;
            this.evaluate(o);
          }
        } catch (r) {
          s.e(r);
        } finally {
          s.f();
        }
      }
      return this;
    }
    /**
     * Disconnects this query from the world. This essentially stops the query from
     * automatically receiving entities.
     */
  }, {
    key: "disconnect",
    value: function() {
      return this._isConnected = !1, this;
    }
    /**
     * Returns a new query that extends this query and also matches entities that
     * have all of the components specified.
     *
     * @param components The components that entities must have.
     * @returns A new query representing the extended query configuration.
     */
  }, {
    key: "with",
    value: function() {
      for (var s = arguments.length, i = new Array(s), o = 0; o < s; o++)
        i[o] = arguments[o];
      return this.world.query(Ce(Ce({}, this.config), {}, {
        with: [].concat(it(this.config.with), i)
      }));
    }
    /**
     * Returns a new query that extends this query and also matches entities that
     * have none of the components specified.
     *
     * @param components The components that entities must not have.
     * @returns A new query representing the extended query configuration.
     */
  }, {
    key: "without",
    value: function() {
      for (var s = arguments.length, i = new Array(s), o = 0; o < s; o++)
        i[o] = arguments[o];
      return this.world.query(Ce(Ce({}, this.config), {}, {
        without: [].concat(it(this.config.without), i)
      }));
    }
    /**
     * Returns a new query that extends this query and also matches entities that
     * match the given predicate.
     *
     * @param predicate The predicate that entities must match.
     * @returns A new query representing the extended query configuration.
     */
  }, {
    key: "where",
    value: function(s) {
      return this.world.query(Ce(Ce({}, this.config), {}, {
        predicates: [].concat(it(this.config.predicates), [s])
      }));
    }
    /**
     * Checks the given entity against this query's configuration, and returns
     * true if the entity matches the query, false otherwise.
     *
     * @param entity The entity to check.
     * @returns True if the entity matches this query, false otherwise.
     */
  }, {
    key: "want",
    value: function(s) {
      return this.config.with.every(function(i) {
        return s[i] !== void 0;
      }) && this.config.without.every(function(i) {
        return s[i] === void 0;
      }) && this.config.predicates.every(function(i) {
        return i(s);
      });
    }
    /**
     * Evaluate the given entity against this query's configuration, and add or
     * remove it from the query if necessary.
     *
     * If `future` is specified, the entity will be evaluated against that entity
     * instead. This is useful for checking if an entity will match the query
     * after some potentially destructive change has been made to it, before
     * actually applying that change to the entity itself.
     *
     * @param entity The entity to evaluate.
     * @param future The entity to evaluate against. If not specified, the entity will be evaluated against itself.
     */
  }, {
    key: "evaluate",
    value: function(s) {
      var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : s;
      if (this.isConnected) {
        var o = this.want(i), r = this.has(s);
        o && !r ? this.add(s) : !o && r && this.remove(s);
      }
    }
  }]), t;
}(zs), us = function(e) {
  return it(new Set(e.sort().filter(function(t) {
    return !!t && t !== "";
  })));
};
function Hc(f) {
  return it(new Set(f));
}
function qc(f) {
  return {
    with: us(f.with),
    without: us(f.without),
    predicates: Hc(f.predicates)
  };
}
function Us(f) {
  return "".concat(f.with.join(","), ":").concat(f.without.join(","), ":").concat(f.predicates.map(function(e) {
    return Nc(e);
  }).join(","));
}
Pc();
class Gc {
  constructor() {
    this.world = this.initCannon(), this.MAX_VELOCITY = 4;
  }
  initCannon() {
    let e = new pa();
    return e.gravity.set(0, -9.82, 0), e.broadphase = new Es(), e.solver.iterations = 20, e;
  }
}
let Vt = null;
class Vs extends Tt {
  constructor() {
    if (super(), Vt)
      return Vt;
    Vt = this, this.world = new jc(), this.physics = new Gc(), this.canvas = document.querySelector("#app"), this.canvas.classList.add("app"), this.scene = new Hi(), this.camera = new bs(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1e3
    ), this.renderer = new qi({ canvas: this.canvas, antialias: !0 }), this.renderer.setSize(window.innerWidth, window.innerHeight), this.renderer.pixelRatio = Math.max(window.devicePixelRatio, 2), this.renderer.xr.enabled = !0, this.renderer.setClearColor(new ve(0, 0, 0)), this.xr = new wc(), this.loader = new xc(), this.input = new Ac(), this.controls = this.addOrbitControls(), this.cannonDebugger = new xa(this.scene, this.physics.world), this.querySystems();
    let e = new Gi(16777215, 1);
    this.scene.add(e), window.addEventListener("resize", () => {
      this.onResize();
    });
  }
  start() {
    this.renderer.xr && this.xr.checkXRSupport(), this.renderer.setAnimationLoop(() => {
      this.update();
    });
  }
  querySystems() {
    this.meshEntities = this.world.with("mesh").without("physics"), this.physicsEntities = this.world.with("mesh", "physics");
  }
  update() {
    this.dispatchEvent({ type: "update", message: "update" }), this.physics.world.fixedStep(), this.cannonDebugger.update(), this.physicsSystem(), this.controls.update(), this.renderer.render(this.scene, this.camera);
  }
  // like this?
  // Or configured via app.input?
  inputSystem() {
  }
  physicsSystem() {
    for (const { mesh: e, physics: t } of this.physicsEntities)
      e.position.copy(t.body.position), e.quaternion.copy(t.body.quaternion);
  }
  // Maybe pull the systems out of App.js
  movementSystem() {
    for (const { mesh: e, velocity: t } of this.meshEntities)
      e.position.x += t.x, e.position.y += t.y, e.position.z += t.z;
  }
  onResize() {
    let e = window.innerWidth, t = window.innerHeight;
    this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
  }
  addOrbitControls() {
    return new Ki(this.camera, this.renderer.domElement);
  }
  addEntity() {
    return this.world.add({});
  }
}
const hs = [
  new Ge(0.2, 0.2, 0.2),
  new Ui(0.2, 0.2, 64),
  new fs(0.2, 0.2, 0.2, 64),
  new Vi(0.2, 8),
  new Wi(0.2, 0.04, 64, 32)
];
function $c(f = 10) {
  let e = [];
  for (let t = 0; t < f; t++) {
    const n = hs[Math.floor(Math.random() * hs.length)], s = new ct({
      color: Math.random() * 16777215,
      roughness: 0.3,
      metalness: 0
    }), i = new ne(n, s);
    i.position.x = Math.random() * 4 - 2, i.position.y = Math.random() * 2, i.position.z = Math.random() * 4 - 2, i.rotation.x = Math.random() * 2 * Math.PI, i.rotation.y = Math.random() * 2 * Math.PI, i.rotation.z = Math.random() * 2 * Math.PI, i.scale.setScalar(Math.random() + 0.5), i.castShadow = !0, i.receiveShadow = !0, e.push(i);
  }
  return e;
}
let Uc = new Ge(), Vc = new rt(), Ws = new ct({ color: 12542314 });
function Zc() {
  return new ne(Uc, Ws);
}
function Qc() {
  return new ne(Vc, Ws);
}
export {
  Vs as App,
  wc as WebXRHandler,
  Zc as createCube,
  $c as createRandomObjects,
  Qc as createSphere
};
