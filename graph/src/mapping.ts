import { BigInt } from "@graphprotocol/graph-ts";
import {
  Contract,
  listingBooked,
  listingClosed,
  OwnershipTransferred
} from "../generated/Contract/Contract";
import { Listing } from "../generated/schema";

export function handlelistingBooked(event: listingBooked): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Listing.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Listing(event.transaction.from.toHex());
  }

  // Entity fields can be set based on event parameters
  entity._id = event.params._id;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.balance(...)
  // - contract.daiJoin(...)
  // - contract.daiToken(...)
  // - contract.getAccountBalance(...)
  // - contract.getFutureTimestamp(...)
  // - contract.getListing(...)
  // - contract.getWithdrawableBalance(...)
  // - contract.isOwner(...)
  // - contract.owner(...)
  // - contract.pot(...)
  // - contract.vat(...)
}

export function handlelistingClosed(event: listingClosed): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}